"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  createContext,
} from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getMaterials } from "@/lib/actions";

function useMaterialContext() {
  const context = useContext(MaterialContext);

  if (!context) {
    throw new Error(
      "useMaterialContext was called outside of the MaterialContext provider"
    );
  }

  return context;
}

interface CameraComponentProps {
  setSelectedOption: (value: React.SetStateAction<string>) => void;
  materials?: { [key: string]: boolean } | null;
}

type MaterialContextType = {
  materials: { [key: string]: boolean } | null;
  setMaterials: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean } | null>
  >;
  handleSetMaterials: (value: string) => void;
};



const MaterialContext = createContext<MaterialContextType | undefined>(
  undefined
);

export default function Page() {
  const [materials, setMaterials] = useState<{ [key: string]: boolean } | null>(
    null
  );
  const [isDetectingMaterials, setIsDetectingMaterials] = useState(false);

  const handleSetMaterials = async (image_url: string) => {
    setIsDetectingMaterials(true); // Aloitetaan materiaalien tunnistus
    const detectedMaterials = await getMaterials(image_url);
    setMaterials(detectedMaterials);
    setIsDetectingMaterials(false); // Materiaalien tunnistus valmis
  };
  return (
    <MaterialContext.Provider value={{ materials, setMaterials, handleSetMaterials }}>
      <div>
        {!materials && !isDetectingMaterials && (
          <MaterialDetector/>
        )}
        {isDetectingMaterials && (
          <p className="text-center">Tunnistetaan materiaaleja...</p>
        )}
        <MaterialResults />
      </div>
    </MaterialContext.Provider>
  );
}

export function MaterialDetector() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-8">
      {!selectedOption && (
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleOptionChange("camera")}
          >
            Käytä kameraa
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleOptionChange("file")}
          >
            Lisää kuva tiedostosta
          </button>
        </div>
      )}
      {selectedOption === "camera" && (
        <CameraComponent
          setSelectedOption={setSelectedOption}
        />
      )}
      {selectedOption === "file" && <FileUploadComponent />}
      {/* Kun kuva on lähetetty ja materiaalit analysoitu, näytetään tulokset */}
    </div>
  );
}

export const CameraComponent: React.FC<CameraComponentProps> = ({
  setSelectedOption,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(true);
  const { handleSetMaterials } = useMaterialContext();
  // Käynnistä kameralaitteen käyttö
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
    } catch (error) {
      console.error("Kameran käynnistäminen epäonnistui:", error);
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context!.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const imageDataUrl = canvasRef.current.toDataURL("image/png");
    setImageURL(imageDataUrl);
    // Sammutetaan kameralaite esikatselun ajaksi
    setIsVideoVisible(false);
  };

  async function sendImageToGPT(image_url: string) {
    setSelectedOption("");
    setIsVideoVisible(false);
    await handleSetMaterials(image_url);
  }

  function resetStates() {
    setImageURL(null);
    setIsVideoVisible(true);
    setIsCameraReady(false);
    startCamera();
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!isCameraReady && (
        <div>
          <p>Kamera latautuu...</p>
        </div>
      )}
      {/* Kameratila  */}
      <div className="flex items-center space-y-3">
        {isVideoVisible && (
          <video
            style={{ display: isCameraReady ? "block" : "none" }}
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="rounded-lg border border-gray-200 shadow-sm"
          ></video>
        )}
        <div />
        {/* Kuvan katsetlu */}
        {imageURL && (
          <div className="bg-gray-200 p-3 justify-center items-center ml-3 rounded-xl">
            <div className="text-center">
              <p className="mb-2 font-medium">
                Näyttääkö kuvankaappaus hyvältä
              </p>
              <Image src={imageURL} alt="Esikatselu" width={500} height={500} />
              <Button
                className="mr-2 mt-4"
                onClick={() => sendImageToGPT(imageURL)}
              >
                Lähetä kuva
              </Button>
              <Button onClick={resetStates}>Ota uusi kuva</Button>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      {isCameraReady && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={captureImage}
        >
          Ota kuvankaappaus
        </button>
      )}
    </div>
  );
};

function MaterialResults() {
  const { materials, setMaterials } = useMaterialContext();
  
  console.log("MaterialResults rendering with materials:", materials);
  if (!materials) {
    return null; // Ei näytetä mitään, jos materiaaleja ei ole asetettu
  }

  // Tarkistetaan, löytyikö mitään materiaalia
  const foundMaterials = Object.entries(materials).filter(
    ([_, value]) => value
  );

  if (foundMaterials.length === 0) {
    return <p>Ei tunnistettuja materiaaleja.</p>;
  }

  return (
    <div className="flex flex-col items-center ">
      <h3>Tunnistetut materiaalit:</h3>
      <ul>
        {foundMaterials.map(([material]) => (
          <li key={material}>{material}</li>
        ))}
      </ul>
      <Button>Lähetä</Button>
    </div>
  );
}

export const FileUploadComponent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageDataUrl = URL.createObjectURL(file);
      setImageURL(imageDataUrl); // Näyttää valitun kuvan esikatselun
      // await handleSetMaterials(imageDataUrl); // Käynnistä materiaalien tunnistus
    }
  };

  const handleClick = () => {
    fileInputRef.current!.click();
  };

  return (
    <div>
      <Button onClick={handleClick}>Avaa tiedosto</Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <div>
        {imageURL && <img src={imageURL} width={100} alt="Esikatselu" />}
        <Button>Send Picture</Button>
      </div>
    </div>
  );
};

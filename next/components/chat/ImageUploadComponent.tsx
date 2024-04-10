import { useState, useRef, useEffect, } from "react";
import { Button } from "../ui/button";
import Image from "next/image";


interface ImageUploadComponentProps {
  onImageSent: () => void;
}

function ImageUploadComponent({ onImageSent }: ImageUploadComponentProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("selectedOption", selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);

    if (option === "file") {
      // Jos käyttäjä valitsi 'file', laukaistaan tiedostonvalitsimen klikkaustapahtuma
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // tee jotain tiedostolla
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
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      )}
      {selectedOption === "camera" && (
        <CameraComponent setSelectedOption={setSelectedOption} onImageSent={onImageSent} />
      )}
      {selectedOption === "file" && <FileUploadComponent />}
      {/* Tiedoston lataamisen logiikan voi lisätä tähän, jos käyttäjä valitsee 'Lisää kuva tiedostosta' */}
    </div>
  );
}

interface CameraComponentProps {
  setSelectedOption: (value: React.SetStateAction<string>) => void;
  onImageSent: () => void;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({
  setSelectedOption,
  onImageSent
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(true);

  // Käynnistä kameralaitteen käyttö
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          console.log("Kamera käynnistetty");
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
    console.log("Kuvankaappaus tallennettu");

    const context = canvasRef.current.getContext("2d");
    context!.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const imageDataUrl = canvasRef.current.toDataURL("image/png");
    setImagePreview(imageDataUrl);
    // Sammutetaan kameralaite esikatselun ajaksi
    setIsVideoVisible(false);
  };

  function sendImage() {
    console.log("Kuva lähetetty");
    setSelectedOption("");
    setIsVideoVisible(false);
    onImageSent();
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!isCameraReady && <p>Kamera latautuu...</p>}
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
        {imagePreview && (
          <div className="bg-gray-200 p-3 justify-center items-center ml-3 rounded-xl">
            <div className="text-center">
              <p className="mb-2 font-medium">
                Näyttääkö kuvankaappaus hyvältä
              </p>
              <Image
                src={imagePreview}
                alt="Esikatselu"
                width={500}
                height={500}
              />
              <Button className="mr-2 mt-4" onClick={sendImage}>
                Lähetä kuva
              </Button>
              <Button
                onClick={() => {
                  setImagePreview(null);
                  setIsVideoVisible(true);
                  setIsCameraReady(false);
                  startCamera();
                }}
              >
                Ota uusi kuva
              </Button>
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

export const FileUploadComponent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("imageURL", imageURL);
  }, [imageURL]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageURL(imageURL);
    }
  };

  return (
    <div>
      <button onClick={() => fileInputRef.current!.click()}>Lisää kuva</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="image/*"
      />
      {imageURL && <img src={imageURL} width={100} alt="Esikatselu" />}
    </div>
  );
};

export default ImageUploadComponent;

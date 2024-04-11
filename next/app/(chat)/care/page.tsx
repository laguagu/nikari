"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import axios from "axios";

interface CameraComponentProps {
  setSelectedOption: (value: React.SetStateAction<string>) => void;
  setMaterials?: React.Dispatch<React.SetStateAction<any>>;
  materials?: { [key: string]: boolean } | null; 
}

interface MaterialProps {
  setMaterials: React.Dispatch<React.SetStateAction<any>>;
  materials: { [key: string]: boolean } | null;
}

export default function Vision() {
  const [materials, setMaterials] = useState(null);
  useEffect(() => {
    console.log("Materiaalit", materials);
  }
  , [materials]);
  return (
    <div>
      <MaterialDetector setMaterials={setMaterials} materials={materials} />
      <MaterialResults materials={materials} />
    </div>
  );
}

export function MaterialDetector({ setMaterials, materials }: MaterialProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        <CameraComponent setSelectedOption={setSelectedOption} setMaterials={setMaterials} materials={materials} />
      )}
      {selectedOption === "file" && <FileUploadComponent />}
      {/* Kun kuva on lähetetty ja materiaalit analysoitu, näytetään tulokset */}

    </div>
  );
}

export const CameraComponent: React.FC<CameraComponentProps> = ({
  setSelectedOption,
  setMaterials,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
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
    setImageURL(imageDataUrl);
    // Sammutetaan kameralaite esikatselun ajaksi
    setIsVideoVisible(false);
  };

  async function sendImageToGPT(image_url: string) {
    setSelectedOption("");
    setIsVideoVisible(false);
    try {
      console.log("Tässä lähetettävä kuva:", image_url);
      console.log("Lähetetään kuva GPT:lle");
      const response = await axios.post(
        "/api/visio/",
        { image_url: image_url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      const materials = JSON.parse(data.message.content);
      setMaterials(materials);
      console.log("Materiialit asetettu", materials);
      console.log("Kuva lähetetty");
    } catch (error) {
      console.error("Virhe kuvan lähetyksessä:", error);
    }
  }

  function resetStates() {
    console.log("Reseting States");
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

function MaterialResults({ materials }: { materials: { [key: string]: boolean } | null }) {
  console.log('MaterialResults rendering with materials:', materials);
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
    <div>
      <h3>Tunnistetut materiaalit:</h3>
      <ul>
        {foundMaterials.map(([material, _]) => (
          <li key={material}>{material}</li>
        ))}
      </ul>
    </div>
  );
}

export const FileUploadComponent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

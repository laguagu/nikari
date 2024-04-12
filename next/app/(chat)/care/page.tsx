"use client";
import React, {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getMaterials } from "@/lib/actions";
import Webcam from "react-webcam";
import CareInstructionsForm from "@/components/chat/CareInstructionsForm";
import { Skeleton } from "@/components/ui/skeleton";
import { CameraSkeleton, FormSkeleton } from "@/components/chat/skeletons";

function useMaterialContext() {
  const context = useContext(MaterialContext);

  if (!context) {
    throw new Error(
      "useMaterialContext was called outside of the MaterialContext provider"
    );
  }

  return context;
}

type MaterialContextType = {
  materials: { [key: string]: boolean } | null;
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
    <MaterialContext.Provider value={{ materials, handleSetMaterials }}>
      <div>
        {!materials && !isDetectingMaterials && <MediaInputComponent />}
        {isDetectingMaterials && (
          <div className="flex justify-center">
            <FormSkeleton />
          </div>
        )}
        {materials && <CareInstructionsForm materials={materials} />}
      </div>
    </MaterialContext.Provider>
  );
}

export const MediaInputComponent = () => {
  const { handleSetMaterials } = useMaterialContext();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [loadingCamera, setLoadingCamera] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    if (option === "file") {
      // Avataan tiedostonvalitsin
      fileInputRef.current?.click();
    }
  };

  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImageURL(screenshot);
    } else {
      console.error("Failed to capture image");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageDataUrl = URL.createObjectURL(file);
      setImageURL(imageDataUrl);
    }
  };

  const sendImageToGPT = async (imageURL: string) => {
    if (imageURL) {
      // Oletetaan, että handleSetMaterials on funktio, joka käsittelee kuvan
      await handleSetMaterials(imageURL);
      setImageURL(null); // Resetoi kuvan esikatselu
      setSelectedOption(""); // Resetoi valitun vaihtoehdon
    }
  };

  const resetStates = () => {
    setImageURL(null);
  };

  const videoConstraints = {
    width: { ideal: 620 },
    height: { ideal: 520 },
    facingMode: { ideal: "environment" },
  };

  const handleCameraStart = () => {
    console.log("Camera is active");
    setLoadingCamera(false);
    setIsWebcamReady(true); // Aseta isWebcamReady true:ksi
  };

  const handleCameraError = (error: any) => {
    console.error("Camera error:", error);
    setCameraError(error.message);
    setLoadingCamera(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-8 relative min-h-[520px]">
      {loadingCamera && <CameraSkeleton />}

      {!imageURL && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={`rounded-xl ${isWebcamReady ? "" : "hidden"}`} // Piilota Webcam-komponentti kunnes se on valmis
            onUserMedia={handleCameraStart}
            onUserMediaError={handleCameraError}
            // onUserMediaError={(error) => console.error('Webcam error: ', error)}
          />
          {isWebcamReady && (
          <div className="flex gap-3">
            <Button onClick={captureImage}>Ota kuvankaappaus</Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              Lisää kuva tiedostosta
            </Button>
          </div>
          )}
        </>
      )}
      {imageURL && (
        <div className="bg-gray-200 p-3 justify-center items-center ml-3 rounded-xl">
          <div className="text-center">
            <Image
              src={imageURL}
              alt="Esikatselu"
              layout="responsive"
              width={1280}
              height={720}
            />
            <Button
              className="mr-2 mt-4"
              onClick={() => sendImageToGPT(imageURL)}
            >
              Hyväksy kuva
            </Button>
            <Button onClick={resetStates}>Ota uusi kuva</Button>
          </div>
        </div>
      )}
      {cameraError && <p>Error: {cameraError}</p>}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

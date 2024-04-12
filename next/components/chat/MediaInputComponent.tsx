"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Webcam from "react-webcam";
import { CameraSkeleton } from "@/components/chat/skeletons";

interface MediaInputComponentProps {
  handleSetMaterials: (value: string) => void;
  imageURL: string | null; // Lisää tämä rivi
  setImageURL: (value: string | null) => void; 
}

export default function MediaInputComponent({
  handleSetMaterials,
  setImageURL,
  imageURL,
}: MediaInputComponentProps) {
  // const { handleSetMaterials } = useMaterialContext();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [imageURL, setImageURL] = useState<string | null>(null);
  const [loadingCamera, setLoadingCamera] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

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
    }
  };

  const resetStates = () => {
    setImageURL(null);
    setLoadingCamera(true);
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
}

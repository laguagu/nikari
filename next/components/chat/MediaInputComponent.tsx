"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Webcam from "react-webcam";
import { CameraSkeleton } from "@/components/chat/skeletons";
import { read } from "fs";

interface MediaInputComponentProps {
  handleSetMaterials: (value: string) => void;
  imageURL: string | null; 
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
      console.log("Screenshot captured", screenshot);
      
      setImageURL(screenshot);
    } else {
      console.error("Failed to capture image");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log("file: ", typeof file);
    if (file) {
      const response = await fetch("/api/visio/resizeImage/", {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        console.error("Failed to resize image");
        return;
      }

      const resizedImage = await response.text();
      setImageURL(resizedImage);
    }
  };

  const sendImageToGPT = async (imageURL: string) => {
    if (imageURL) {
      handleSetMaterials(imageURL);
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
    setLoadingCamera(false);
    setIsWebcamReady(true);
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
          />
          {isWebcamReady && (
            <div className="flex gap-3">
              <Button onClick={captureImage}>Take Screenshot</Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload Image
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
              Accept and Send
            </Button>
            <Button onClick={resetStates}>Take New Picture</Button>
          </div>
        </div>
      )}
      {cameraError && (
        <p>
          Error: {cameraError}
          <br />
          Please plug in camera to continue.
        </p>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

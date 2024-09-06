"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DocumentPlusIcon,
  CameraIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Webcam from "react-webcam";
import { CameraSkeleton } from "@/components/chat/skeletons";
import { Card, CardContent } from "@/components/ui/card";
interface MediaInputComponentProps {
  handleSetMaterials: (value: string) => void;
  imageURL: string | null;
  setImageURL: (value: string | null) => void;
}

const exampleImages = [
  { src: "/examples/akademia.png", alt: "Wood furniture" },
  { src: "/examples/lounge.png", alt: "Leather sofa" },
  { src: "/examples/tarjoilu.png", alt: "Metal chair" },
];

export default function MediaInputComponent({
  handleSetMaterials,
  setImageURL,
  imageURL,
}: MediaInputComponentProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImageURL(screenshot);
    } else {
      console.error("Failed to capture image");
    }
  };

  const handleExampleClick = async (src: string) => {
    // Muunna kuva base64-muotoon ja aseta se esikatseluun
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setImageURL(base64data);
        setSelectedExample(src);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading example image:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
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
  };

  const videoConstraints = {
    width: { ideal: 620 },
    height: { ideal: 520 },
    facingMode: { ideal: "environment" },
  };

  const handleCameraStart = () => {
    setLoadingCamera(false);
    setIsWebcamReady(true);
    setIsCameraActive(true);
  };

  const handleCameraError = (error: any) => {
    console.error("Camera error:", error);
    setCameraError(error.message);
    setLoadingCamera(false);
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    if (!isCameraActive) {
      setLoadingCamera(true);
    } else {
      setLoadingCamera(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 md:my-6 my-3 relative ">
      {!isCameraActive && !imageURL && (
        <div className="md:mb-2s border-white flex flex-col md:flex-row items-center justify-center max-w-md mx-auto p-4 bg-zinc-200 border-2 rounded-xl">
          <Image
            alt="instructions step 1"
            src={"/steps/step-1.webp"}
            height={175}
            width={175}
            className="aspect-square rounded-xl object-cover shadow-lg mx-4 my-2"
          />
          <p className="text-start break-words max-w-xs md:max-w-sm">
            Capture a clear photo of your furniture. Ensure the photo is
            well-lit and the entire piece of furniture is visible in the shot.
          </p>
        </div>
      )}
      {loadingCamera && !imageURL && <CameraSkeleton />}
      {!imageURL && (
        <div className="flex gap-3">
          {!isCameraActive && (
            <>
              <Button
                onClick={toggleCamera}
                className="font-semibold"
                variant={"outline"}
              >
                Activate Camera
                <CameraIcon className="w-5 ml-2" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <Button
                variant={"outline"}
                onClick={() => fileInputRef.current?.click()}
                className="font-semibold"
              >
                <DocumentPlusIcon className="w-5 mr-1 flex-shrink-0 right-0" />
                Upload Image
              </Button>
            </>
          )}
        </div>
      )}
      {isCameraActive && !imageURL && (
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
          <div className="flex gap-3">
            {!loadingCamera && isWebcamReady && (
              <Button
                onClick={captureImage}
                className="font-semibold"
                variant={"outline"}
              >
                <CameraIcon className="w-5 mr-1 flex-shrink-0 right-0" />
                Take Screenshot
              </Button>
            )}
            {!loadingCamera && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <Button
                  variant={"outline"}
                  onClick={() => fileInputRef.current?.click()}
                  className="font-semibold"
                >
                  <DocumentPlusIcon className="w-5 mr-1 flex-shrink-0 right-0" />
                  Upload Image
                </Button>
              </>
            )}
          </div>
        </>
      )}
      {imageURL && (
        <div className="bg-gray-200 md:p-8 p-5 justify-center items-center ml-3 rounded-xl border-white border-2 shadow-md border-opacity-80 ">
          <div className="text-center justify-center">
            <Image
              src={imageURL}
              alt="Esikatselu"
              className="rounded-md object-contain md:max-w-lg md:max-h-none max-h-96 w-full h-auto"
              width={640}
              height={360}
            />
            <div className="space-y-2 mt-2 xs:space-x-0 sm:space-x-3 md:space-x-3 ">
              <Button
                variant={"outline"}
                className="font-semibold"
                onClick={() => sendImageToGPT(imageURL)}
              >
                <CheckIcon className="w-5 mr-1 flex-shrink-0 right-0" />
                Accept and Send
              </Button>
              <Button
                onClick={resetStates}
                variant={"outline"}
                className="font-semibold"
              >
                <CameraIcon className="w-5 mr-1 flex-shrink-0 right-0" />
                Take New Picture
              </Button>
            </div>
          </div>
        </div>
      )}
      {cameraError && !imageURL && (
        <div className="text-center text-lg">
          <p>
            Error: {cameraError}
            <br />
            Please plug in camera or continue by uploading from files.
          </p>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* example images */}
      {!isCameraActive && !imageURL && (
        <div className="w-full mt-4">
          <div className="flex items-center justify-center space-x-4">
            <h3 className="text-sm font-semibold whitespace-nowrap">
              No image?
              <br /> Try one of these:
            </h3>
            <div className="flex space-x-2">
              {exampleImages.map((img, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:opacity-80 transition-opacity w-20 h-20"
                  onClick={() => handleExampleClick(img.src)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        layout="fill"
                        className="rounded-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

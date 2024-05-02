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
import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { buttonVariants } from "@/components/ui/button";
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
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImageURL(screenshot);
    } else {
      console.error("Failed to capture image");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
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
    <div className="flex flex-col items-center justify-center space-y-4 md:mt-4 relative ">
      <div className="text-center text-lg md:mx-20 flex-col">
        <p className="font-semibold mb-2 tracking-tight ">
          Please take or upload a photo of the furniture piece for which you
          need care instructions.
        </p>
      </div>

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
        <div className="bg-gray-200 p-3 justify-center items-center ml-3 rounded-xl">
          <div className="text-center justify-center">
            <Image
              src={imageURL}
              alt="Esikatselu"
              className="rounded-md"
              style={{ width: "100%", height: "auto" }}
              width={1280}
              height={720}
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
      {/* <div className="text-center text-base font-light md:mx-20 flex-col">
        <div className="inline-block p-2 border-b-2 items-center">
          <div className="flex items-center">
            <span className="font-normal text-sm">
              Want to view all material care instructions right now?
            </span>
            <Button variant={"outline"} className="ml-2 font-bold">
              <PhotoIcon className="w-5 mr-1 flex-shrink-0 right-0" />
              <Link href="/care/search?materials=metal%2Cleather%2Claminate%2Cplastic%2Cfabric%2Coutdoor%2Cwood">
                Explore
              </Link>
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

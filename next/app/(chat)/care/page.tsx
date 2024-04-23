"use client";
import React, { useState } from "react";
import { getMaterials } from "@/lib/actions";
import CareInstructionsForm from "@/components/chat/CareInstructionsForm";
import { FormSkeleton } from "@/components/chat/skeletons";
import MediaInputComponent from "@/components/chat/MediaInputComponent";
import Error from "@/components/chat/error";
export default function Page() {
  const [materials, setMaterials] = useState<{ [key: string]: boolean } | null>(
    null
  );
  const [isDetectingMaterials, setIsDetectingMaterials] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSetMaterials = async (image_url: string) => {
    setIsDetectingMaterials(true);
    setError(null); // Resetoi virhetila
    try {
      const materials = await getMaterials(image_url);
      setMaterials(materials);
      setIsDetectingMaterials(false);
    } catch (error) {
      setError((error as Error).message);
      setIsDetectingMaterials(false);
    }
  };

  return (
    <div>
      {error && !imageURL && <Error cameraError={error} />}
      {!materials && !isDetectingMaterials && (
        <MediaInputComponent
          handleSetMaterials={handleSetMaterials}
          setImageURL={setImageURL}
          imageURL={imageURL}
        />
      )}
      {isDetectingMaterials && (
        <div className="flex justify-center">
          <FormSkeleton />
        </div>
      )}
      {materials && <CareInstructionsForm materials={materials} />}
    </div>
  );
}

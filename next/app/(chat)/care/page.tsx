"use client";
import React, { useState } from "react";
import { getMaterials } from "@/lib/actions";
import CareInstructionsForm from "@/components/chat/CareInstructionsForm";
import { FormSkeleton } from "@/components/chat/skeletons";
import MediaInputComponent from "@/components/chat/MediaInputComponent";

export default function Page() {
  const [materials, setMaterials] = useState<{ [key: string]: boolean } | null>(
    null
  );
  const [isDetectingMaterials, setIsDetectingMaterials] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleSetMaterials = async (image_url: string) => {
    setIsDetectingMaterials(true);
    const detectedMaterials = await getMaterials(image_url);
    setMaterials(detectedMaterials);
    setIsDetectingMaterials(false);
};

  return (
    <div>
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

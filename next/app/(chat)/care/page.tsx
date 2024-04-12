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

  const handleSetMaterials = async (image_url: string) => {
    setIsDetectingMaterials(true); // Aloitetaan materiaalien tunnistus
    const detectedMaterials = await getMaterials(image_url);
    setMaterials(detectedMaterials);
    setIsDetectingMaterials(false); // Materiaalien tunnistus valmis
  };

  return (
    <div>
      {!materials && !isDetectingMaterials && (
        <MediaInputComponent handleSetMaterials={handleSetMaterials} />
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

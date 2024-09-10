"use client";
import MediaInputComponent from "@/components/chat/MediaInputComponent";
import CareInstructionsForm from "@/components/chat/care/CareInstructionsForm";
import Error from "@/components/chat/error";
import { FormSkeleton } from "@/components/chat/skeletons";
import { getMaterials } from "@/lib/actions";
import { fadeVariants } from "@/lib/animation-config";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const [materials, setMaterials] = useState<{ [key: string]: boolean } | null>(
    null,
  );
  const [isDetectingMaterials, setIsDetectingMaterials] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSetMaterials = async (image_url: string) => {
    setIsDetectingMaterials(true);
    setError(null); // Resetoi virhetila
    try {
      let materials = await getMaterials(image_url);
      setMaterials(materials);
      setIsDetectingMaterials(false);
    } catch (error) {
      setError((error as Error).message);
      setIsDetectingMaterials(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
    >
      <AnimatePresence mode="wait">
        {error && !imageURL && (
          <motion.div
            key="error"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Error cameraError={error} />
          </motion.div>
        )}
        {!materials && !isDetectingMaterials && (
          <motion.div
            key="mediaInput"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MediaInputComponent
              handleSetMaterials={handleSetMaterials}
              setImageURL={setImageURL}
              imageURL={imageURL}
            />
          </motion.div>
        )}
        {isDetectingMaterials && (
          <motion.div
            key="formSkeleton"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex justify-center"
          >
            <FormSkeleton />
          </motion.div>
        )}
        {materials && (
          <motion.div
            key="careInstructions"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CareInstructionsForm materials={materials} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

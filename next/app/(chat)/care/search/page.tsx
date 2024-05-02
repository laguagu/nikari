"use client";
import { useSearchParams } from "next/navigation";
import { careInstructions } from "@/lib/hoitoOhjeet";
import { MaterialCareInstructions } from "@/lib/definition";
import CareGuides from "@/components/chat/care/CareGuides";

function Page() {
  const [searchParams] = useSearchParams();
  const material = searchParams ? searchParams[1] : null;
  const materials = material ? material.split(",") : [];

  const careGuides = materials.map((material: string) => {
    const key = material as keyof MaterialCareInstructions;
    return {
      material: key,
      instructions: careInstructions[key],
    };
  });
  
  return (
    <div>
      <CareGuides careGuides={careGuides} />
    </div>
  );
}

export default Page;

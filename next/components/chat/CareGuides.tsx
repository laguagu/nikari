import React from "react";
import { MaterialInstructions } from "./CareInstructionsForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CareGuidesProps {
  careGuides: MaterialInstructions[];
}
export default function CareGuides({ careGuides }: CareGuidesProps) {
  return (
    <div className="max-h-[500px] overflow-y-auto p-4 bg-white shadow rounded-lg">
      <p className="text-gray-600 mb-4">
        Below are the care instructions based on the materials identified in
        your furniture. Click on each material to view the specific care
        instructions.
      </p>
      {careGuides.map((careGuide, index) => (
        <Accordion key={index} type="single" collapsible className="mb-4">
          <AccordionItem value={careGuide.material}>
            <AccordionTrigger className="bg-blue-100 hover:bg-blue-200 cursor-pointer px-4 py-2 rounded text-lg font-medium text-gray-800">
              {careGuide.material.charAt(0).toUpperCase() +
                careGuide.material.slice(1)}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2 bg-blue-50 rounded shadow-inner">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {careGuide.instructions &&
                  Object.entries(careGuide.instructions).map(
                    ([key, instruction]) => (
                      <li key={key} className="text-sm">
                        {instruction}
                      </li>
                    )
                  )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

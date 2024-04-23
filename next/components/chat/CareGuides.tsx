import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Material, CareGuidesProps } from "@/lib/definition";
type BackgroundClasses = {
  [key in Material]: string;
};

const backgroundClasses: BackgroundClasses = {
  wood: "bg-yellow-100",
  laminate: "bg-gray-200",
  metal: "bg-gray-300",
  leather: "bg-amber-300",
  plastic: "bg-blue-100",
  fabric: "bg-gray-100",
  outdoor: "bg-green-100",
};

export default function CareGuides({ careGuides }: CareGuidesProps) {
  return (
    <div className="max-h-[500px] overflow-y-auto p-4 bg-white shadow rounded-lg">
      <p className="text-gray-600 mb-4">
        Below are the care instructions based on the materials identified in
        your furniture. Click on each material to view the specific care
        instructions.
      </p>
      {careGuides.map((careGuide, index) => {
        const materialKey = careGuide.material;
        return (
          <Accordion key={index} type="single" collapsible className="mb-4">
            <AccordionItem value={careGuide.material}>
              <AccordionTrigger
                className={`${backgroundClasses[materialKey]} relative cursor-pointer px-6 py-3 rounded-lg text-lg font-semibold text-gray-900 group`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 ease-in-out"></div>
                {careGuide.material.charAt(0).toUpperCase() +
                  careGuide.material.slice(1)}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 rounded-lg bg-gray-100">
                <ul className="space-y-2">
                  {careGuide.instructions &&
                    Object.entries(careGuide.instructions).map(
                      ([key, instruction]) => (
                        <li
                          key={key}
                          className="text-sm bg-gray-50 rounded-full px-4 py-2"
                        >
                          {instruction}
                        </li>
                      )
                    )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}

      <span className="flex">
        If you need further assistance, please contact our customer
        service&nbsp;<p className="font-bold">sales@nikari.fi</p>
      </span>
    </div>
  );
}

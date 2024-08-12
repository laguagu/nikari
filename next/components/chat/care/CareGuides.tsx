import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CareGuidesProps } from "@/lib/definition";
import { materialPhotos } from "@/lib/photos";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function formatMaterialName(name: string): string {
  // Muuntaa camelCase-muotoisen merkkijonon sanoiksi
  const words = name.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Muuntaa jokaisen sanan ensimmäisen kirjaimen isoksi
  const titleCase = words.replace(/\b(\w)/g, (char) => char.toUpperCase());

  return titleCase;
}

export default function CareGuides({ careGuides }: CareGuidesProps) {
  return (
    <div className="md:p-4 ">
      <div className=" overflow-y-auto p-4 bg-zinc-50 bg-opacity-90 shadow rounded-lg outline outline-white">
        <p className="text-gray-700 mb-4 text-lg tracking-tight border-b">
          Click on each material to view the specific care instructions.
        </p>
        {careGuides.map((careGuide, index) => {
          const materialKey = careGuide.material;
          const multiPhotosMaterial = materialPhotos.find(
            (photo) => photo.name === materialKey,
          );
          let materialDisplay =
            careGuide.material === "outdoor"
              ? "outdoor furniture"
              : careGuide.material;

          return (
            <Accordion key={index} type="single" collapsible className="mb-4">
              <AccordionItem value={careGuide.material}>
                <AccordionTrigger
                  className={`bg-zinc-100 relative cursor-pointer px-6 py-3 rounded-lg text-lg font-semibold group `}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 ease-in-out"></div>
                  {formatMaterialName(materialDisplay)}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 rounded-lg bg-zinc-100 bg-opacity-50 my-2 shadow-md hover:shadow-lg transition-shadow duration-200 border-2">
                  <Carousel>
                    <CarouselContent>
                      {careGuide.instructions &&
                        Object.entries(careGuide.instructions).map(
                          ([key, instruction], idx) => {
                            const photo = multiPhotosMaterial?.photos[idx];
                            return (
                              <CarouselItem
                                key={idx}
                                className="flex flex-col justify-around"
                              >
                                {photo && (
                                  <div className="flex flex-col items-center">
                                    <Image
                                      alt="Furniture care instructions"
                                      src={photo.imageSrc}
                                      height={400}
                                      width={400}
                                      className="aspect-[1/1] rounded-xl mb-4 cursor-pointer shadow-md object-cover border-2 border-white"
                                      title="Furniture care instructions"
                                    />
                                  </div>
                                )}
                                <p className="text-gray-800 md:text-lg text-left tracking-tight border-b">
                                  {instruction}
                                </p>
                              </CarouselItem>
                            );
                          },
                        )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

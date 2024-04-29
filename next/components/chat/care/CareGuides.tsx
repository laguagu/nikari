import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Material, CareGuidesProps } from "@/lib/definition";
import photos, { materialPhotos } from "@/lib/photos";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type BackgroundClasses = {
  [key in Material]: string;
};

// const backgroundClasses: BackgroundClasses = {
//   wood: "bg-yellow-100 text-zinc-50",
//   laminate: "bg-gray-200 text-zinc-50",
//   metal: "bg-gray-300",
//   leather: "bg-amber-300 text-zinc-50",
//   plastic: "bg-blue-100",
//   fabric: "bg-gray-100 text-zinc-700",
//   outdoor: "bg-green-100",
// };

// const backgroundImages = {
//   wood: "/background/wood.jpg",
//   laminate: "/background/laminate.jpg",
//   metal: "",
//   leather: "/background/nahkaa.jpg",
//   plastic: "",
//   fabric: "/background/fabric.jpg",
//   outdoor: "",
// };

export default function CareGuides({ careGuides }: CareGuidesProps) {
  return (
    <div className="md:p-4 ">
      <div className=" overflow-y-auto p-4 bg-zinc-50  shadow rounded-lg">
        <p className="text-gray-600 mb-4 text-lg tracking-tight">
          Below are the care instructions based on the materials identified in
          your furniture. Click on each material to view the specific care
          instructions.
        </p>
        {careGuides.map((careGuide, index) => {
          const materialKey = careGuide.material;
          const multiPhotosMaterial = materialPhotos.find(
            (photo) => photo.name === materialKey
          );

          return (
            <Accordion key={index} type="single" collapsible className="mb-4">
              <AccordionItem value={careGuide.material}>
                <AccordionTrigger
                  // style={{
                  //   backgroundImage: `url(${backgroundImages[materialKey]})`,
                  // }}
                  className={`bg-zinc-100 relative cursor-pointer px-6 py-3 rounded-lg text-lg font-semibold group `}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 ease-in-out"></div>
                  {careGuide.material.charAt(0).toUpperCase() +
                    careGuide.material.slice(1)}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 rounded-lg bg-zinc-100 bg-opacity-50 my-2 shadow-lg hover:shadow-xl transition-shadow duration-200">
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
                                <p className="text-gray-800 md:text-lg text-left tracking-tight border-b">
                                  {instruction}
                                </p>
                                {photo && (
                                  <div className="flex flex-col items-center">
                                      <Image
                                        alt="Furniture care instructions"
                                        src={photo.imageSrc}
                                        height={400}
                                        width={400}
                                        className="aspect-[1/1] rounded-xl mt-4 cursor-pointer shadow-md object-cover"
                                        title="Furniture care instructions"
                                      />
                                  </div>
                                )}
                              </CarouselItem>
                            );
                          }
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

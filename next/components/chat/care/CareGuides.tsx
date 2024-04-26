import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Material, CareGuidesProps } from "@/lib/definition";
import photos from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";
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

const backgroundClasses: BackgroundClasses = {
  wood: "bg-yellow-100 text-zinc-50",
  laminate: "bg-gray-200 text-zinc-50",
  metal: "bg-gray-300",
  leather: "bg-amber-300 text-zinc-50",
  plastic: "bg-blue-100",
  fabric: "bg-gray-100 text-zinc-700",
  outdoor: "bg-green-100",
};

const backgroundImages = {
  wood: "/background/wood.jpg",
  laminate: "/background/laminate.jpg",
  metal: "",
  leather: "/background/nahkaa.jpg",
  plastic: "",
  fabric: "/background/fabric.jpg",
  outdoor: "",
};

export default function CareGuides({ careGuides }: CareGuidesProps) {
  return (
    <div>
      <div className=" overflow-y-auto p-4 bg-zinc-50  shadow rounded-lg">
        <p className="text-gray-600 mb-4 text-lg tracking-tight">
          Below are the care instructions based on the materials identified in
          your furniture. Click on each material to view the specific care
          instructions.
        </p>
        {careGuides.map((careGuide, index) => {
          const materialKey = careGuide.material;
          const photo = photos.find((photo) => photo.name === materialKey);

          return (
            <Accordion key={index} type="single" collapsible className="mb-4">
              <AccordionItem value={careGuide.material}>
                <AccordionTrigger
                  style={{
                    backgroundImage: `url(${backgroundImages[materialKey]})`,
                  }}
                  className={`${backgroundClasses[materialKey]} relative cursor-pointer px-6 py-3 rounded-lg text-lg font-semibold group `}
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
                          ([key, instruction], idx) => (
                            <CarouselItem
                              key={idx}
                              className="p-4 flex flex-col justify-around"
                            >
                              <p className="text-gray-800 md:text-lg text-left tracking-tight border-b">
                                {instruction}
                              </p>
                              {photo && (
                                <div className="flex flex-col items-center">
                                  <Link
                                    href={`/care/search/photos/${photo.id}`}
                                  >
                                    <Image
                                      alt=""
                                      src={photo.imageSrc}
                                      height={200}
                                      width={200}
                                      className="w-auto rounded-xl mt-4 cursor-pointer shadow-xl object-cover"
                                      title="Click to view care instructions"
                                    />
                                  </Link>
                                </div>
                              )}
                            </CarouselItem>
                          )
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

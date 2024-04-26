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
import { Button } from "../ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"

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
        <p className="text-gray-600 mb-4">
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
                  className={`${backgroundClasses[materialKey]} relative cursor-pointer px-6 py-3 rounded-lg text-lg font-semibold group  `}
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
                            className="text-base bg-gray-50 rounded-sm md:rounded-full px-4 py-4 md:px-6 md:py-3 md:text-sm"
                          >
                            {instruction}
                          </li>
                        )
                      )}
                  </ul>
                  {photo && (
                    <div className="flex flex-col items-center bg-gray-100">
                      <p className="text-gray-700 mt-4 text-2xl">
                        Click image bellow to view the care instructions
                      </p>
                      <Link href={`/care/search/photos/${photo.id}`}>
                        <Image
                          alt=""
                          src={photo.imageSrc}
                          height={100}
                          width={100}
                          className="w-auto rounded-xl mt-4 cursor-pointer shadow-xl object-cover"
                          title="Click to view care instructions"
                        />
                      </Link>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
      <div className="flex flex-col p-4 mt-2 space-y-2 ">
        <div className="flex items-center justify-start">
          <p className="text-xl">
            You can find all the images of care instructions in the photo
            gallery.
          </p>
          <Link href="/care/search/photos">
            <Button className="font-bold shadow-md md:ml-3" variant="outline">
              Photos
            </Button>
          </Link>
          
        </div>
        <div className="flex justify-start items-center">
          <p className="text-xl">
            or visit Nikaris official material care collection
          </p>
          <Link href="https://www.dropbox.com/sh/72ex6pt62kfuoqa/AAALld8u9JcILgr6CQ8QAqota?e=1&dl=0">
            <Button className="font-bold shadow-md md:ml-3 ml-1" variant="outline">
            Collection
            </Button>
          </Link>
        </div>
        <p className="text-lg font-light">
          If you need more information, please contact our customer
          service:&nbsp;
          <Link
            href="mailto:sales@nikari.fi"
            className="text-blue-500 underline italic"
          >
            sales@nikari.fi
          </Link>
        </p>
      <Separator />
      </div>
    </div>
  );
}

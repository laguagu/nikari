import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CareGuidesProps } from "@/lib/definition";
import { materialPhotos } from "@/lib/photos";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function formatMaterialName(name: string): string {
  // Muuntaa camelCase-muotoisen merkkijonon sanoiksi
  const words = name.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Muuntaa jokaisen sanan ensimmäisen kirjaimen isoksi
  const titleCase = words.replace(/\b(\w)/g, (char) => char.toUpperCase());

  return titleCase;
}

export default function CareGuides({ careGuides }: CareGuidesProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="md:p-4"
    >
      <motion.div className="overflow-y-auto p-4 bg-zinc-50 bg-opacity-90 shadow rounded-lg outline outline-white">
        <motion.p
          variants={itemVariants}
          className="text-gray-700 p-4 text-sm sm:text-base text-center border-b border-gray-200 mb-4"
        >
          Select a material to view its care instructions
        </motion.p>
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
            <motion.div key={index} variants={itemVariants}>
              <Accordion type="single" collapsible className="mb-4">
                <AccordionItem value={careGuide.material}>
                  <AccordionTrigger className="bg-zinc-100 relative cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold group">
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 rounded-lg transition-all duration-300 ease-in-out"></div>
                    {formatMaterialName(materialDisplay)}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 py-4 rounded-lg bg-zinc-100 bg-opacity-50 my-2 shadow-sm hover:shadow transition-shadow duration-200 border">
                    <Carousel className="max-w-xl mx-auto">
                      <CarouselContent>
                        {careGuide.instructions &&
                          Object.entries(careGuide.instructions).map(
                            ([key, instruction], idx) => {
                              const photo = multiPhotosMaterial?.photos[idx];
                              return (
                                <CarouselItem
                                  key={idx}
                                  className="flex flex-col items-center align-middle justify-center"
                                >
                                  {photo && (
                                    <Image
                                      alt="Furniture care instructions"
                                      src={photo.imageSrc}
                                      height={350}
                                      width={350}
                                      className="rounded-lg mb-4 sm:mb-6 object-cover shadow-sm"
                                    />
                                  )}
                                  <p className="text-gray-700 text-center max-w-md text-sm sm:text-base leading-snug sm:leading-relaxed">
                                    {instruction}
                                  </p>
                                </CarouselItem>
                              );
                            },
                          )}
                      </CarouselContent>
                      <CarouselPrevious className="bg-zinc-200 hover:bg-zinc-300" />
                      <CarouselNext className="bg-zinc-200 hover:bg-zinc-300" />
                    </Carousel>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

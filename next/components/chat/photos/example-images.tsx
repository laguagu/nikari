import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const exampleImages = [
  { src: "/examples/akademia.png", alt: "Wood furniture" },
  { src: "/examples/lounge.png", alt: "Leather sofa" },
  { src: "/examples/tarjoilu.png", alt: "Metal chair" },
];

export function ExampleImages({
  onExampleClick,
}: {
  onExampleClick: (src: string) => void;
}) {
  return (
    <div className="w-full sm:mt-2">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
        <h3 className="text-sm font-semibold text-center sm:text-left whitespace-nowrap">
          No image?
          <br /> Try one of these:
        </h3>
        <div className="flex flex-row sm:flex-row space-x-2">
          {exampleImages.map((img, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:opacity-80 transition-opacity w-20 h-20"
              onClick={() => onExampleClick(img.src)}
            >
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 80px, 80px"
                    className="rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

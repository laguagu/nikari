import Image from "next/image";
import { Photo } from "@/lib/photos";

export default function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <>
      <Image
        alt=""
        src={photo.imageSrc}
        height={600}
        width={600}
        className="col-span-1 aspect-square w-full object-cover"
      />

      <div className=" bg-white p-2 px-4">
        <h3 className="font-serif text-xl font-medium text-center">
          How to take care for {photo.name} material
        </h3>
      </div>
    </>
  );
}

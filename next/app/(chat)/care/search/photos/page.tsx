import Link from "next/link";
import Image from "next/image";
import photos from "@/lib/photos";
import BackButton from "@/components/chat/BackButton";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
export default function Photos() {
  return (
    <section className="mt-6">
      <div className="container">
        <div className="flex justify-between">
          <h1 className="font-serif text-3xl font-bold text-gray-700">
            Care instructions
          </h1>
          <BackButton>
            <ArrowUturnLeftIcon className="w-4 mr-2" />
            Go Back{" "}
          </BackButton>
        </div>
        <div className="border-b mt-2"></div>
        <ul className="mt-10 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {photos.map(({ id, imageSrc }) => (
            <li key={id}>
              <Link href={`/care/search/photos/${id}`}>
                <Image
                  alt=""
                  src={imageSrc}
                  height={500}
                  width={500}
                  className="aspect-square w-full rounded-xl object-cover shadow-lg"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

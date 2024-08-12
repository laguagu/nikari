import photos, { Photo } from "@/lib/photos";
import PhotoCard from "@/components/chat/photos/PhotoCard";
import BackButton from "@/components/chat/BackButton";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: Photo = photos.find((p) => p.id === id)!;
  return (
    <section className="py-10">
      <div className="container flex flex-col items-center justify-center">
        <div>
          <BackButton>
            <ArrowUturnLeftIcon className="w-4 mr-1 " />
            Return
          </BackButton>
        </div>
        <div className="mt-4 w-2/3">
          <PhotoCard photo={photo} />
        </div>
      </div>
    </section>
  );
}

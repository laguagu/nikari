"use client";
import photos, { Photo } from "@/lib/photos";
import PhotoCard from "@/components/chat/PhotoCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: Photo = photos.find((p) => p.id === id)!;
  const router = useRouter();
  return (
    <section className="py-10">
      <div className="container flex flex-col items-center justify-center">
        <div>
          <Button onClick={() => router.back()} className="">
            Back to care instructions
          </Button>
        </div>
        <div className="mt-4 w-2/3">
          <PhotoCard photo={photo} />
        </div>
      </div>
    </section>
  );
}

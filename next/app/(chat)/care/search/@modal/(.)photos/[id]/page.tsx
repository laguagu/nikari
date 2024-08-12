import photos, { Photo } from "@/lib/photos";
import PhotoCard from "@/components/chat/photos/PhotoCard";
import Modal from "@/components/chat/photos/Modal";

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: Photo = photos.find((p) => p.id === id)!;

  return (
    <Modal>
      <PhotoCard key={photo.id} photo={photo} />
    </Modal>
  );
}

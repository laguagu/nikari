import GoogleMaps from "@/components/chat/maps/GoogleMaps";
import { Suspense } from "react";
import Loader from "@/components/chat/Loader";
export default function Page() {
  return (
    <Suspense fallback={<Loader>Loading map</Loader>}>
      <GoogleMaps />
    </Suspense>
  );
}

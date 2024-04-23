import GoogleMaps from "@/components/chat/maps/GoogleMaps";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Map...</div>}>
      <GoogleMaps />
    </Suspense>
  );
}

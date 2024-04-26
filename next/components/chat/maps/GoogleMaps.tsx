"use client";
import { LoadScriptNext } from "@react-google-maps/api";
import Map from "@/components/chat/maps/map";

export default function GoogleMaps() {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is missing.");
    return <div>Error: Google Maps API key not found</div>;
  }

  return (
    <div>
      <LoadScriptNext googleMapsApiKey={apiKey} libraries={["places"]}>
        <Map />
      </LoadScriptNext>
    </div>
  );
}

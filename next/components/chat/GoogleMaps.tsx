"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  LoadScriptNext,
  InfoWindow,
} from "@react-google-maps/api";
import { dealers } from "@/lib/dealers";

interface Dealer {
  name: string;
  lat: number;
  lng: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export default function GoogleMaps() {
  const [userLocation, setUserLocation] = useState({
    lat: 60.192059,
    lng: 24.945831,
  });
  const [nearestDealer, setNearestDealer] = useState<UserLocation>({
    lat: 0,
    lng: 0,
  });
  const [mapCenter, setMapCenter] = useState<UserLocation>({
    lat: 60.192059,
    lng: 24.945831,
  });
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newPos);
        setMapCenter(newPos);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation && dealers.length) {
      const nearestDealer = findNearestDealer(userLocation, dealers);
      if (nearestDealer) {
        setNearestDealer(nearestDealer);
        console.log("Lähin jälleenmyyjä: ", nearestDealer);
      }
    }
  }, [userLocation, dealers]);

  const onMarkerClick = (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setMapCenter({ lat: dealer.lat, lng: dealer.lng }); // Päivitä kartan keskusta
  };

  const center = {
    lat: 60.192059,
    lng: 24.945831,
  };

  if (!apiKey) {
    console.error("Google Maps API key is missing.");
    return <div>Error: Google Maps API key not found</div>;
  }
  return (
    <div className="flex justify-center">
      <LoadScriptNext googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter} // Käytä mapCenter tilaa keskittämään kartta
          zoom={10}
        >
          {dealers.map((dealer) => (
            <Marker
              key={dealer.name}
              position={{ lat: dealer.lat, lng: dealer.lng }}
              onClick={() => onMarkerClick(dealer)}
              label={
                dealer === nearestDealer
                  ? {
                      text: "Nearest retailer",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }
                  : undefined
              }
              icon={
                typeof google !== "undefined" && dealer === nearestDealer // Tämä type tarkistus tarvitaan jotta sovellukse buildaus toimii
                  ? {
                      url: "https://maps.gstatic.com/mapfiles/ms2/micons/green.png",
                      labelOrigin:
                        typeof window !== "undefined"
                          ? new google.maps.Point(15, 40)
                          : undefined, 
                    }
                  : undefined
              }
            />
          ))}
          {selectedDealer && (
            <InfoWindow
              position={{ lat: selectedDealer.lat, lng: selectedDealer.lng }}
              onCloseClick={() => setSelectedDealer(null)}
            >
              <div>
                <h2>{selectedDealer.name}</h2>
                {/* Lisää tähän lisää tietoa jälleenmyyjästä */}
              </div>
            </InfoWindow>
          )}
          {userLocation && (
            <Marker
              position={userLocation}
              label={{
                text: "Your location",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              icon={
                typeof google !== "undefined" // Tämä type tarkistus tarvitaan jotta sovellukse buildaus toimii
                  ? {
                      url: "https://maps.gstatic.com/mapfiles/ms2/micons/blue.png",
                      labelOrigin: new google.maps.Point(15, 40), // Muuta näitä arvoja siirtääksesi tekstiä
                    }
                  : undefined
              }
            />
          )}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
}

function findNearestDealer(
  userLocation: UserLocation,
  dealers: Dealer[]
): Dealer | null {
  if (!userLocation) return null;

  return dealers.reduce((nearest: Dealer | null, dealer) => {
    const distanceToCurrentDealer = Math.sqrt(
      Math.pow(dealer.lat - userLocation.lat, 2) +
        Math.pow(dealer.lng - userLocation.lng, 2)
    );
    const distanceToNearestDealer = nearest
      ? Math.sqrt(
          Math.pow(nearest.lat - userLocation.lat, 2) +
            Math.pow(nearest.lng - userLocation.lng, 2)
        )
      : Infinity;

    return distanceToCurrentDealer < distanceToNearestDealer ? dealer : nearest;
  }, null);
}

import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
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

interface MarkerComponentProps {
  position: { lat: number; lng: number };
  iconUrl: string;
  onClick?: () => void;
  label?: {
    text: string;
    color: string;
    fontSize: string;
    fontWeight: string;
  };
}

// Luo uusi MarkerComponent, joka ottaa vastaan position ja iconUrl propsit.
const MarkerComponent: React.FC<MarkerComponentProps> = ({
  position,
  iconUrl,
  onClick,
  label,
}) => {
  const icon = {
    url: iconUrl,
    labelOrigin: new google.maps.Point(15, 40),
  };

  return (
    <Marker position={position} icon={icon} onClick={onClick} label={label} />
  );
};
export default function Map() {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 60.192059,
    lng: 24.945831,
  });
  const [nearestDealer, setNearestDealer] = useState<Dealer | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  // Päivitä käyttäjän sijainti
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newPos); // Päivitä käyttäjän sijainti saaduilla koordinaateilla
        },
        (error) => {
          console.error("Geolocation error: ", error); // Lisää virheenkäsittely
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  const onMarkerClick = useCallback((dealer: Dealer) => {
    setSelectedDealer(dealer);
  }, []);

  // Etsi lähin jälleenmyyjä
  useEffect(() => {
    if (userLocation && dealers.length) {
      setNearestDealer(findNearestDealer(userLocation, dealers));
    }
  }, [userLocation, dealers]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "500px" }}
      center={userLocation}
      zoom={10}
    >
      {dealers.map((dealer) => (
        <MarkerComponent
          key={dealer.name}
          position={{ lat: dealer.lat, lng: dealer.lng }}
          iconUrl={
            dealer === nearestDealer
              ? "https://maps.gstatic.com/mapfiles/ms2/micons/green.png"
              : "http://maps.gstatic.com/mapfiles/ms2/micons/red.png"
          }
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
        />
      ))}
      {selectedDealer && (
        <InfoWindow
          position={{ lat: selectedDealer.lat, lng: selectedDealer.lng }}
          onCloseClick={() => setSelectedDealer(null)}
        >
          <div>
            <h2>{selectedDealer.name}</h2>
          </div>
        </InfoWindow>
      )}
      {userLocation && (
        <MarkerComponent
          position={userLocation}
          iconUrl="https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png"
          label={{
            text: "Your location",
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      )}
    </GoogleMap>
  );
}

function findNearestDealer(
  userLocation: UserLocation,
  dealers: Dealer[],
): Dealer | null {
  if (!userLocation) return null;

  return dealers.reduce((nearest: Dealer | null, dealer) => {
    const distanceToCurrentDealer = Math.sqrt(
      Math.pow(dealer.lat - userLocation.lat, 2) +
        Math.pow(dealer.lng - userLocation.lng, 2),
    );
    const distanceToNearestDealer = nearest
      ? Math.sqrt(
          Math.pow(nearest.lat - userLocation.lat, 2) +
            Math.pow(nearest.lng - userLocation.lng, 2),
        )
      : Infinity;

    return distanceToCurrentDealer < distanceToNearestDealer ? dealer : nearest;
  }, null);
}

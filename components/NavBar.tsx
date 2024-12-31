"use client";
import { MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import LocationPermission from "./LocationPermission";
import Link from "next/link";
import PinSelection from "./PinSelection";

const NavBar = ({
  location,
}: {
  location: {
    lat: number;
    lng: number;
  };
}) => {
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const fetchPincode = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        const addressComponents = data.results[0].address_components;
        const postalCode = addressComponents.find((component: any) =>
          component.types.includes("postal_code")
        );
        setPincode(postalCode.short_name);
      } catch (error) {
        console.error("Error fetching pincode:", error);
      }
    };

    if (location.lat !== 0 && location.lng !== 0) {
      fetchPincode(location.lat, location.lng);
    }
  }, [location]);

  return (
    <div className="flex justify-between items-center p-4 ">
      <div className="flex justify-between w-full max-w-[1200px] m-auto">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>G</AvatarFallback>
          </Avatar>
          <div>
            <p>Welcome, Guest</p>
            {!pincode ? (
              <LocationPermission />
            ) : (
              <p className="flex items-center gap-2">
                <MapPin />
                <span className="flex">
                  <PinSelection currLocation={location} />
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="btn">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

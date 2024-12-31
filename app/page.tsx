"use client";
import { useEffect, useState } from "react";
import HomePage from "@/components/HomePage";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div>
      <NavBar location={currentLocation} />
      <HomePage />
    </div>
  );
}

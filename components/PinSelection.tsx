"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { ChevronDown, LocateFixed, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import AddressForm from "./AddressForm";
import Link from "next/link";

const PinSelection = ({
  currLocation,
}: {
  currLocation: {
    lat: number;
    lng: number;
  };
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    setLocation({
      lat: currLocation.lat,
      lng: currLocation.lng,
    });
  }, [currLocation]);

  //Fetching address details from Google Maps API based on the location coordinates
  const [addressDetails, setAddressDetails] = useState({
    neighborhood: "",
    pincode: "",
    sublocality: "",
    locality: "",
    country: "",
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const fetchAddressDetails = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        const addressComponents = data.results[0].address_components;

        const details = {
          neighborhood: getAddressComponent(addressComponents, "neighborhood"),
          pincode: getAddressComponent(addressComponents, "postal_code"),
          sublocality: getAddressComponent(addressComponents, "sublocality"),
          locality: getAddressComponent(addressComponents, "locality"),
          country: getAddressComponent(addressComponents, "country"),
          lat: location.lat,
          lng: location.lng,
        };

        setAddressDetails(details);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    const getAddressComponent = (addressComponents: any[], type: string) => {
      const component = addressComponents.find((component: any) =>
        component.types.includes(type)
      );
      return component ? component.short_name : "";
    };

    if (location.lat !== 0 && location.lng !== 0) {
      fetchAddressDetails(location.lat, location.lng);
    }
  }, [location]);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center gap-1">
        Current Location <b>{addressDetails.pincode}</b>
        <ChevronDown />
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex">
          <div className="flex max-w-[1200px] m-auto  w-full p-6">
            <GoogleMap
              zoom={15}
              center={location}
              mapContainerStyle={{ width: "100%", height: "80vh" }}
              onClick={(e) =>
                setLocation({ lat: e.latLng!.lat(), lng: e.latLng!.lng() })
              }
            >
              <Marker position={location} />
            </GoogleMap>
            <div className="absolute bottom-0 left-0  w-full h-[240px]">
              <div className="w-full flex mx-auto mb-3">
                <Button
                  className="mx-auto"
                  variant="secondary"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          });
                        },
                        (error) => {
                          console.error("Error getting location:", error);
                        }
                      );
                    } else {
                      console.error(
                        "Geolocation is not supported by this browser."
                      );
                    }
                  }}
                >
                  <LocateFixed />
                  Locate Me
                </Button>
              </div>

              <div className="flex justify-between px-11 items-center h-full w-full max-w-[600px] bg-white mx-auto shadow-lg rounded-md pb-8">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-800 font-semibold text-sm sm:text-md">
                    Select Your Delivery Location
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin size={30} />{" "}
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      {addressDetails.locality}
                    </h2>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-md">{`${addressDetails.sublocality}, ${addressDetails.neighborhood}, ${addressDetails.country}, ${addressDetails.pincode}`}</p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Link href="/ManageAddress">
                    <Button variant="outline">Manage Address</Button>
                  </Link>
                  <AddressForm addressDetails={addressDetails} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PinSelection;

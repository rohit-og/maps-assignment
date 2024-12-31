"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LocateOff, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const LocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState("unknown");
  const router = useRouter();

  useEffect(() => {
    const checkPermission = async () => {
      if (navigator.permissions && navigator.permissions.query) {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        setPermissionStatus(permission.state);
      } else {
        setPermissionStatus("unsupported");
      }
    };

    checkPermission();
  }, []);

  const requestPermission = async () => {
    if (navigator.geolocation) {
      try {
        await navigator.geolocation.getCurrentPosition(
          () => {
            setPermissionStatus("granted");
            window.location.reload(); // Refresh the page after allowing location access
          },
          () => setPermissionStatus("denied")
        );
      } catch (error) {
        setPermissionStatus("denied");
      }
    } else {
      setPermissionStatus("unsupported");
    }
  };

  return (
    <div>
      {permissionStatus === "prompt" && (
        <Drawer>
          <DrawerTrigger className="text-red-500 font-semibold flex items-center gap-1">
            <LocateOff size={20} />
            Allow location access
          </DrawerTrigger>
          <DrawerContent className="flex justify-center items-center ">
            <Image
              className="m-5"
              src="/location.png"
              width={80}
              height={80}
              alt="Location icon"
            />
            <DrawerHeader className="flex flex-col max-w-96  items-center gap-4">
              <DrawerTitle>Location permission is off</DrawerTitle>
              <DrawerDescription className="text-center">
                We need your location to find the nearest store & provide you a
                seamless delivery experience
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div>
                <Button className="block w-full" onClick={requestPermission}>
                  Enable Location
                </Button>
              </div>
              <DrawerClose>
                <Button variant="outline">
                  <Search />
                  Search your Location Manually
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default LocationPermission;

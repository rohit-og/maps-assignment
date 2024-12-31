"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building,
  ChevronsUpDown,
  Cross,
  Handshake,
  Home,
  HomeIcon,
  MapPin,
  Search,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";

const page = ({
  addressDetails,
}: {
  addressDetails: {
    neighborhood: string;
    pincode: string;
    sublocality: string;
    locality: string;
    country: string;
    lat: number;
    lng: number;
  };
}) => {
  const [addresses, setAddresses] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get("/api/addresses");
      setAddresses(response.data.addresses);
      console.log(response.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handelDelete = async (mongoId: string) => {
    const response = await axios.delete("/api/addresses", {
      params: {
        id: mongoId,
      },
    });
    console.log(response);
    fetchAddresses();
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="px-4">
      <div className="flex flex-col gap-4 w-full mx-auto justify-center items-center py-6 border-b mb-5">
        <div className="flex items-center justify-between gap-4 w-full max-w-[1200px] m-auto">
          <Link href="/">
            <ArrowLeft />
          </Link>
          <h1>Your Addresses</h1>
          <Avatar></Avatar>
        </div>
      </div>
      <div className="flex flex-col gap-4 max-w-[600px] mx-auto">
        <form action="" className="flex gap-2">
          <Input type="text" placeholder="Search your area/pincode/apartment" />
          <Button variant="outline">
            <Search />
          </Button>
        </form>
        <hr />
        <h1 className="text-lg font-semibold text-gray-900">Saved Locations</h1>
        <div className="space-y-2">
          <Popover open={open1} onOpenChange={setOpen1}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open1}
                className="w-full h-full justify-between"
              >
                <div className="flex items-center gap-4 ">
                  <HomeIcon size={32} />
                  <div className="flex flex-col items-start">
                    <h1 className="text-lg font-semibold">Home</h1>
                    <p className="text-gray-500">
                      See all your home addresses here
                    </p>
                  </div>
                </div>

                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full sm:w-[600px] p-4">
              {addresses
                .filter((address) => address.category === "home")
                .map((address) => {
                  return (
                    <>
                      {!address ? (
                        <p>No Home Addresses Found</p>
                      ) : (
                        <div className="flex gap-4 items-center justify-between border-b mb-4">
                          <div className="flex flex-col items-start">
                            <h1 className="text-lg font-semibold">
                              {address.house}
                            </h1>
                            <p className="text-gray-500">{`${address.apartment}, ${address.locality}, ${address.sublocality}, ${address.country}, ${address.pincode}`}</p>
                          </div>
                          <Button
                            variant="secondary"
                            onClick={() => handelDelete(address._id)}
                          >
                            <X />
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })}
            </PopoverContent>
          </Popover>

          <Popover open={open2} onOpenChange={setOpen2}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open2}
                className="w-full h-full justify-between"
              >
                <div className="flex items-center gap-4 ">
                  <Building />
                  <div className="flex flex-col items-start">
                    <h1 className="text-lg font-semibold">Office</h1>
                    <p className="text-gray-500">
                      See all your office addresses here
                    </p>
                  </div>
                </div>

                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full sm:w-[600px] p-4">
              {addresses
                .filter((address) => address.category === "office")
                .map((address) => {
                  return (
                    <>
                      {!address ? (
                        <p>No Home Addresses Found</p>
                      ) : (
                        <div className="flex gap-4 items-center justify-between border-b mb-4">
                          <div className="flex flex-col items-start">
                            <h1 className="text-lg font-semibold">
                              {address.house}
                            </h1>
                            <p className="text-gray-500">{`${address.apartment}, ${address.locality}, ${address.sublocality}, ${address.country}, ${address.pincode}`}</p>
                          </div>
                          <Button
                            variant="secondary"
                            onClick={() => handelDelete(address._id)}
                          >
                            <X />
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })}
            </PopoverContent>
          </Popover>

          <Popover open={open3} onOpenChange={setOpen3}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open3}
                className="w-full h-full justify-between"
              >
                <div className="flex items-center gap-4 ">
                  <Handshake />
                  <div className="flex flex-col items-start">
                    <h1 className="text-lg font-semibold">Friends & Family</h1>
                    <p className="text-gray-500">
                      See all your friends & family addresses here
                    </p>
                  </div>
                </div>

                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full sm:w-[600px] p-4">
              {addresses
                .filter((address) => address.category === "friends")
                .map((address) => {
                  return (
                    <>
                      {!address ? (
                        <p>No Home Addresses Found</p>
                      ) : (
                        <div className="flex gap-4 items-center justify-between border-b mb-4">
                          <div className="flex flex-col items-start">
                            <h1 className="text-lg font-semibold">
                              {address.house}
                            </h1>
                            <p className="text-gray-500">{`${address.apartment}, ${address.locality}, ${address.sublocality}, ${address.country}, ${address.pincode}`}</p>
                          </div>
                          <Button
                            variant="secondary"
                            onClick={() => handelDelete(address._id)}
                          >
                            <X />
                          </Button>
                        </div>
                      )}
                    </>
                  );
                })}
            </PopoverContent>
          </Popover>
        </div>
        <hr />
        <h2 className="text-lg font-semibold">Recent Searches</h2>
        <div>
          {addresses.map((address) => {
            return (
              <>
                {!address ? (
                  <p>No Home Addresses Found</p>
                ) : (
                  <div className="flex gap-4 items-center justify-between border px-4 py-2 rounded-md shadow-sm mb-4">
                    <div className="flex items-center gap-4 ">
                      <MapPin />
                      <div className="flex flex-col items-start">
                        <h1 className="text-lg font-semibold">
                          {address.house}
                        </h1>
                        <p className="text-gray-500">{`${address.apartment}, ${address.locality}, ${address.sublocality}, ${address.country}, ${address.pincode}`}</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => handelDelete(address._id)}
                    >
                      <X />
                    </Button>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;

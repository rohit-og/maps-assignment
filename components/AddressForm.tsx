"use client";
import { MapPin } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddressForm = ({
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
  const [data, setData] = useState({
    house: "",
    apartment: "",
    category: "",
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("house", e.currentTarget.house.value);
    formData.append("apartment", e.currentTarget.apartment.value);
    formData.append("category", e.currentTarget.category.value);
    formData.append("neighborhood", addressDetails.neighborhood);
    formData.append("pincode", addressDetails.pincode);
    formData.append("sublocality", addressDetails.sublocality);
    formData.append("locality", addressDetails.locality);
    formData.append("country", addressDetails.country);
    formData.append("lat", addressDetails.lat.toString());
    formData.append("lng", addressDetails.lng.toString());

    const response = await axios.post("/api/addresses", formData);
    if (response.data.success) {
      console.log("Address added successfully");
      setData({
        house: "",
        apartment: "",
        category: "home",
      });
    } else {
      console.log("Error adding address");
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="w-full">Save</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader className="max-w-[800px] m-auto  ">
          <SheetTitle className="flex items-center gap-2 ">
            <MapPin size={48} />{" "}
            <div className="flex flex-col items-start  mt-2">
              <h2 className="text-3xl font-bold">{addressDetails.locality}</h2>
              <p className="text-gray-500 text-sm">{`${addressDetails.sublocality}, ${addressDetails.neighborhood}, ${addressDetails.country}, ${addressDetails.pincode}`}</p>
            </div>
          </SheetTitle>
          <SheetDescription>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-9 flex flex-col items-start"
            >
              <div className="flex flex-col w-full max-w-sm items-start gap-1.5">
                <Label htmlFor="house">HOUSE / FLAT / BLOCK NO.</Label>
                <Input
                  name="house"
                  type="text"
                  onChange={handleChange}
                  value={data.house}
                  id="house"
                  required
                />
              </div>
              <div className="flex flex-col w-full max-w-sm items-start gap-1.5">
                <Label htmlFor="apartment">APARTMENT / ROAD / AREA</Label>
                <Input
                  name="apartment"
                  type="text"
                  onChange={handleChange}
                  value={data.apartment}
                  id="apartment"
                  required
                />
              </div>
              <div className="flex flex-col w-full max-w-sm items-start gap-1.5">
                <Label htmlFor="category">ADDRESS TYPE</Label>
                <select
                  name="category"
                  className="border px-4 py-2 rounded-md shadow-sm"
                  onChange={handleChange}
                  value={data.category}
                  id="category"
                  required
                >
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                  <option value="friends">Friends & family</option>
                </select>
              </div>
              <Button type="submit">Save Address</Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddressForm;

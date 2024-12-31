import { connectDB } from "@/utils/db";
import AddressModel from "@/lib/models/Address";
const { NextResponse } = require("next/server");
const fs = require("fs");

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

//fetching all addresses
export async function GET(req: any) {
  const addressId = req.nextUrl.searchParams.get("id");
  if (addressId) {
    const address = await AddressModel.findById(addressId);
    return NextResponse.json(address);
  } else {
    const addresses = await AddressModel.find({});
    return NextResponse.json({ addresses });
  }
}

//adding an address
export async function POST(req: any) {
  const formData = await req.formData();

  const addressData = {
    house: `${formData.get("house")}`,
    apartment: `${formData.get("apartment")}`,
    category: `${formData.get("category")}`,
    neighborhood: `${formData.get("neighborhood")}`,
    pincode: `${formData.get("pincode")}`,
    sublocality: `${formData.get("sublocality")}`,
    locality: `${formData.get("locality")}`,
    country: `${formData.get("country")}`,
    lat: `${formData.get("lat")}`,
    lng: `${formData.get("lng")}`,
  };

  await AddressModel.create(addressData);
  return NextResponse.json({ success: true, msg: "address added" });
}

//deleting an address

export async function DELETE(req: any) {
  const addressId = await req.nextUrl.searchParams.get("id");
  await AddressModel.findByIdAndDelete(addressId);
  return NextResponse.json({ success: true, msg: "address deleted" });
}

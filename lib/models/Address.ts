import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  house: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  sublocality: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const AddressModel =
  mongoose.models.address || mongoose.model("address", addressSchema);

export default AddressModel;

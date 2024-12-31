import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rohitsharma63693:qLLvrVM4twmphYSP@cluster0.vdmcnfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("DB connected");
};

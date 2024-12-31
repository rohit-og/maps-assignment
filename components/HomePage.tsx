import React from "react";
import { Button } from "./ui/button";

const HomePage = () => {
  return (
    <div className="flex">
      <div className="flex max-w-[1200px] m-auto  w-full">
        {" "}
        <section className="bg-gray-100 py-20 w-full">
          <div className="container mx-auto flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-center mb-8 ">
              Welcome to our Food Delivery Service
            </h1>
            <p className="text-lg text-center mb-8">
              Order your favorite food online and get it delivered to your
              doorstep!
            </p>
            <div className="flex justify-center">
              <Button className="">Order Now</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

import { getOutlets } from "@/utils/actions";
import { getImageUrl } from "@/utils/helpers";
import Image from "next/image";
import React from "react";

const outlets = [
  {
    name: "Basundhara City Complex",
    image: "/images/outlets/basundhara-city.jpg",
  },
  {
    name: "Dhanmondi",
    image: "/images/outlets/dhanmondi.jpg",
  },
  {
    name: "Jamuna Future Park",
    image: "/images/outlets/jamuna.jpg",
  },
  {
    name: "Rajshahi",
    image: "/images/outlets/rajshahi.jpg",
  },
  {
    name: "Sylhet",
    image: "/images/outlets/sylhet.jpg",
  },
  {
    name: "Khulna",
    image: "/images/outlets/khulna.jpg",
  },
  {
    name: "Chittagong",
    image: "/images/outlets/chittagong.jpg",
  },
  {
    name: "Basundhara City Women",
    image: "/images/outlets/basundhara-women.jpg",
  },
];

const OutletsSection = async() => {

const outlets= await getOutlets()


  return (
    <section className="bg-[#f8fcff] py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-4">
            <span className="block h-[2px] w-12 bg-gray-400"></span>
            <h2 className="text-2xl md:text-3xl font-bold text-center space-grotesk">
              Our All Outlets
            </h2>
            <span className="block h-[2px] w-12 bg-gray-400"></span>
          </div>
        </div>

        {/* Outlets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {outlets?.data?.map((outlet, index) => (
            <div key={index} className="text-center">
              <div className="w-full h-34 sm:h-52 md:h-64 relative">
                <Image
                   src={getImageUrl("branch", outlet?.image) || "/placeholder.svg"}
                  alt={outlet.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-800">
                {outlet?.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutletsSection;

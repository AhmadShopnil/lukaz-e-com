"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { getImageUrl } from "@/utils/helpers";



export default function BannerSlider({banners}) {
  return (
    <div className="relative w-full h-[180px] mt-10 mb-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-full w-full rounded-md"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[120px]">
              <Image
                src={getImageUrl("banners",banner?.image)}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover rounded-md"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

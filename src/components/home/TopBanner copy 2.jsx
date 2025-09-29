"use client"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

const slides = [
  {
    id: 1,
    title: "INTERNATIONAL ORDER AVAILABLE",
    bgImage: "/images/banner/b1.png",
    link: "/international-shop",
  },
  {
    id: 2,
    title: "EXCLUSIVE DEALS JUST FOR YOU",
    bgImage: "/images/banner/b2.png",
    link: "/international-shop",
  },
  {
    id: 3,
    title: "SHOP THE LATEST COLLECTION",
    bgImage: "/images/banner/b1.png",
    link: "/international-shop",
  },
]

export default function TopBanner() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-[30vh] xs:h-[40vh] sm:h-[30vh] md:h-[40vh] lg:h-[70vh] relative"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: "contain", // Changed from "cover" to "contain" to show full image
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              {/* Gradient Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

              {/* Content Section */}
              <div className="relative z-10 max-w-2xl px-4 sm:px-12 text-left">
                <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-gray-200 max-w-lg">
                  Discover unique collections and enjoy hassle-free international shipping.
                </p>

                <div className="mt-6 sm:mt-8">
                  <Link
                    href={slide.link}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

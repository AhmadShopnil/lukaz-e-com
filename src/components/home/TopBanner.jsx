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
    <div className="w-full bg-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-[20vh] xs:h-[34vh] sm:h-[38vh] md:h-[40vh] lg:h-[65vh] relative"
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
              {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div> */}

              {/* Content Section */}
              <div className="relative z-10 max-w-2xl px-4 sm:px-12 text-left">
                <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-1 sm:mt-4 text-xs sm:text-lg md:text-xl text-gray-200 max-w-lg">
                  Discover unique collections and enjoy hassle-free international shipping.
                </p>

                <div className="mt-3 sm:mt-8">
                  <Link
                    href={slide.link}
                    className="space-grotesk  text-white font-semibold px-4 sm:px-6 md:px-8 py-1.5 sm:py-2  md:py-3 
                    rounded-md border border-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out sm:mt-4
                     text-xs sm:text-lg md:text-xl hover:border-[#3A9E75] hover:bg-[#3A9E75]"
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

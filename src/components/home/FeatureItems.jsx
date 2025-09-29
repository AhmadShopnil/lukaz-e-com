"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import CardWithFullImage from "../shared/CardWithFullImage";

const products = [
  { name: "Gray Pant", image: "/images/pant/2.jpg" },
  { name: "Jins Pant", image: "/images/pant/5.jpg" },
  { name: "Black Pant", image: "/images/pant/3.jpg" },
  { name: "Formal Shoes", image: "/images/pant/4.jpg" },
  { name: "Casual Shoes", image: "/images/shoe/4.jpg" },
  { name: "Sandals", image: "/images/shoe/shoe_2.png" },
  { name: "Pants", image: "/images/catImg/pant.webp" },
  { name: "Shirts", image: "/images/catImg/shirt.webp" },
  { name: "Accessories", image: "/images/catImg/accessories.webp" },
  { name: "Panjabi", image: "/images/catImg/panjabi.webp" },
  { name: "T-Shirts", image: "/images/catImg/shirt.webp" },
  { name: "Jackets", image: "/images/catImg/jacket.png" },
];

export default function FeatureItems({ featureItems }) {
  // console.log("featureItems", featureItems)
  return (
    <section className="py-6">
      <div className="mb-6 border-b-2 border-[#3A9E75]">
        <h1 className="font-semibold text-xl sm:text-2xl mb-2 space-grotesk ">Best Items</h1>
      </div>

      {/* Mobile & Desktop Swiper */}
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          0: { slidesPerView: 1.3 },
          524: { slidesPerView: 2 },
          768: { slidesPerView: 2.4 },
          // 1024: { slidesPerView: 5.4 },   

          1024: { slidesPerView: 4 },
          1250: { slidesPerView: 4.4 },
          1624: { slidesPerView: 5.4 },
        }}
      >
        {featureItems?.map((product, i) => (
          <SwiperSlide key={i}>
            <CardWithFullImage item={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

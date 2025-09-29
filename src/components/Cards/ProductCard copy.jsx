import { getImageUrl } from "@/utils/helpers";
import Link from "next/link";


export default function ProductCard({item}) {
  return (
    <Link 
    href={`/product/${item?.slug}`}
    className=" mx-auto cursor-pointer">
  <div className="bg-gray-300  rounded-md  ">
    <img
      src={getImageUrl("products",item?.color_thumbnails)}
      alt="ASICS Superblast 2"
      className="w-full  object-contain hover:scale-105 duration-400 
      transition-transform"
    />

  </div>
  <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-900">{item?.product_name}</h3>
      <p className="text-sm text-gray-600">৳ {item?.current_price}</p>
    </div>
</Link>

  )
}

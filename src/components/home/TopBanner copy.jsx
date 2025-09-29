import React from 'react';
import Link from 'next/link';



export default function TopBanner() {
  return (
    <div className="w-full">
 

      {/* Hero banner */}
      <div className="bg-[#3A9E75] w-full text-center py-10 relative overflow-hidden">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold space-grotesk ">
          INTERNATIONAL ORDER <br /> AVAILABLE
        </h1>
        <div className="mt-8">
          <Link
            href="/international-shop"
            className="bg-white text-[#3A9E75] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition space-grotesk"
          >
            Shop Now
          </Link>
        </div>
      </div>

    </div>
  );
}

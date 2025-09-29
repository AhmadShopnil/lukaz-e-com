"use client" // This component uses client-side hooks like useState and useMemo

import Image from "next/image"
import { useState, useMemo, useRef, useEffect, useContext } from "react"
import { Heart, ChevronDown } from "lucide-react" // Import Heart and ChevronDown icons
import Container from "@/components/shared/Container"
import PriceRange from "@/components/Products/PriceRange"
import { WishListContext } from "@/context/WishListContext"
import toast from "react-hot-toast"
import Link from "next/link"

// Dummy product data for demonstration purposes
const productsData = [
    
  {
    id: "1",
    name: "Cascadia 19 Women's Trail Running Shoes - AW25",
    brand: "Brooks",
    price: 135.0,
     images: [
    "/images/pant/2.jpg",
    "/images/pant/1.jpg",
    "/images/pant/3.jpg",
    "/images/pant/4.jpg",
    "/images/pant/5.jpg",
  ],
    sizes: ["S", "M", "L"],
    colors: ["light-blue", "gray", "orange"], // Using specific color names for better representation
    freeDelivery: true,
  },
  {
    id: "2",
    name: "Classic Fit Cotton Chinos",
    brand: "Gap",
    price: 59.99,
     images: [
    "/images/pant/1.jpg",
    "/images/pant/1.jpg",
    "/images/pant/3.jpg",
    "/images/pant/4.jpg",
    "/images/pant/5.jpg",
  ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["beige", "navy", "black"],
    freeDelivery: false,
  },
  {
    id: "3",
    name: "UltraBoost 23 Running Shoes",
    brand: "Adidas",
    price: 160.0,
     images: [
    "/images/pant/3.jpg",
    "/images/pant/1.jpg",
    "/images/pant/3.jpg",
    "/images/pant/4.jpg",
    "/images/pant/5.jpg",
  ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["black", "white"],
    freeDelivery: true,
  },
  {
    id: "4",
    name: "Everyday Carry Leather Wallet",
    brand: "Bellroy",
    price: 89.0,
    images: [
    "/images/pant/5.jpg",
    "/images/pant/1.jpg",
    "/images/pant/3.jpg",
    "/images/pant/4.jpg",
    "/images/pant/2.jpg",
  ],
    sizes: ["One Size"],
    colors: ["brown", "black", "green"],
    freeDelivery: false,
  },
  {
    id: "5",
    name: "Organic Cotton Crewneck T-Shirt",
    brand: "Everlane",
    price: 30.0,
     images: [
      "/images/pant/4.jpg",
    "/images/pant/2.jpg",
    "/images/pant/1.jpg",
    "/images/pant/3.jpg",
    
    "/images/pant/5.jpg",
  ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["white", "gray", "navy"],
    freeDelivery: true,
  },
  {
    id: "6",
    name: "Lightweight Puffer Jacket",
    brand: "Patagonia",
    price: 199.0,
    images: [
      "/images/pant/4.jpg",
      "/images/pant/2.jpg",
      "/images/pant/1.jpg",
      "/images/pant/3.jpg",
      "/images/pant/5.jpg",
  ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "black", "red"],
    freeDelivery: false,
  },
  {
    id: "7",
    name: "High-Waisted Skinny Jeans",
    brand: "Levi's",
    price: 79.0,
     images: [
      "/images/pant/4.jpg",
      "/images/pant/2.jpg",
      "/images/pant/1.jpg",
      "/images/pant/3.jpg",
      "/images/pant/5.jpg",
  ],
    sizes: ["26", "28", "30", "32"],
    colors: ["dark-wash", "light-wash", "black"],
    freeDelivery: true,
  },
  {
    id: "8",
    name: "Classic Canvas Sneakers",
    brand: "Converse",
    price: 55.0,
     images: [
      "/images/pant/4.jpg",
      "/images/pant/2.jpg",
      "/images/pant/1.jpg",
      "/images/pant/3.jpg",
      "/images/pant/5.jpg",
  ],
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["white", "black", "red"],
    freeDelivery: false,
  },
  {
    id: "9",
    name: "Wool Blend Beanie",
    brand: "Carhartt WIP",
    price: 28.0,
    images: [
      "/images/pant/4.jpg",
      "/images/pant/2.jpg",
      "/images/pant/1.jpg",
      "/images/pant/3.jpg",
      "/images/pant/5.jpg",
  ],
    sizes: ["One Size"],
    colors: ["black", "gray", "orange"],
    freeDelivery: true,
  },
  {
    id: "10",
    name: "Waterproof Hiking Boots",
    brand: "Merrell",
    price: 140.0,
    images: [
      "/images/pant/4.jpg",
      "/images/pant/2.jpg",
      "/images/pant/1.jpg",
      "/images/pant/3.jpg",
      "/images/pant/5.jpg",
  ],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["brown", "green"],
    freeDelivery: false,
  },
]
// Helper function to extract unique values for filter options
const getUniqueValues = (data, key) => {
  const allValues = data.flatMap((item) => item[key])
  return [...new Set(allValues)].sort()
}
const categories=["Men","Women","Kids","Shoe","Run","Hike","Sports"]
const allBrands = getUniqueValues(productsData, "brand")
const allSizes = getUniqueValues(productsData, "sizes")
const allColors = getUniqueValues(productsData, "colors")

// Determine min/max prices from dummy data
const minProductPrice = Math.min(...productsData.map((p) => p.price))
const maxProductPrice = Math.max(...productsData.map((p) => p.price))

export default function ShopPage() {
   const { state,dispatch } = useContext(WishListContext);
  const [activeThumb, setActiveThumb] = useState(null)

  // State for filter values
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState(null) 
  const [selectedCategory, setSelectedCategory] = useState(null) 
  const [selectedSize, setSelectedSize] = useState(null) 
  const [selectedColor, setSelectedColor] = useState(null) 
  const [minPrice, setMinPrice] = useState(minProductPrice)
  const [maxPrice, setMaxPrice] = useState(maxProductPrice)
  const [sortOrder, setSortOrder] = useState("featured") // 'featured', 'lowToHigh', 'highToLow'

  // Dropdown open states
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false)
  const [isCatgoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isSizesDropdownOpen, setIsSizesDropdownOpen] = useState(false)
  const [isColorsDropdownOpen, setIsColorsDropdownOpen] = useState(false)
  const [isPriceSortDropdownOpen, setIsPriceSortDropdownOpen] = useState(false)

  // Refs for dropdowns to close on outside click
  const brandsRef = useRef(null)
    const categoryRef = useRef(null)
  const sizesRef = useRef(null)
  const colorsRef = useRef(null)
  const priceSortRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandsRef.current && !brandsRef.current.contains(event.target)) {
        setIsBrandsDropdownOpen(false)
      }
       if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false)
      }
      if (sizesRef.current && !sizesRef.current.contains(event.target)) {
        setIsSizesDropdownOpen(false)
      }
      if (colorsRef.current && !colorsRef.current.contains(event.target)) {
        setIsColorsDropdownOpen(false)
      }
      if (priceSortRef.current && !priceSortRef.current.contains(event.target)) {
        setIsPriceSortDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handlers for filter changes (now single selection)
  const handleBrandChange = (brand) => {
    setSelectedBrand((prev) => (prev === brand ? null : brand))
    setIsBrandsDropdownOpen(false) // Close dropdown after selection
  }
   const handleCategoryChange = (cat) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat))
    setIsCategoryDropdownOpen(false) // Close dropdown after selection
  }

  const handleSizeChange = (size) => {
    setSelectedSize((prev) => (prev === size ? null : size))
    setIsSizesDropdownOpen(false) // Close dropdown after selection
  }

  const handleColorChange = (color) => {
    setSelectedColor((prev) => (prev === color ? null : color))
    setIsColorsDropdownOpen(false) // Close dropdown after selection
  }

  // Memoized filtered and sorted products for performance
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = productsData.filter((product) => {
      // Apply search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      // Apply brand filter (single selection)
      if (selectedBrand && product.brand !== selectedBrand) {
        return false
      }
      // Apply size filter (single selection)
      if (selectedSize && !product.sizes.includes(selectedSize)) {
        return false
      }
      // Apply color filter (single selection)
      if (selectedColor && !product.colors.includes(selectedColor)) {
        return false
      }
      // Apply price range filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false
      }
      return true
    })

    // Apply sorting
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.price - a.price)
    }
    // 'featured' or default order is maintained by initial productsData order

    return filtered
  }, [searchTerm, selectedBrand, selectedSize, selectedColor, minPrice, maxPrice, sortOrder])

  // Helper to get Tailwind color classes for color swatches
  const getColorClass = (color) => {
    switch (color) {
      case "white":
        return "bg-white border border-gray-300"
      case "black":
        return "bg-black"
      case "blue":
        return "bg-blue-500"
      case "red":
        return "bg-red-500"
      case "brown":
        return "bg-amber-800"
      case "gray":
        return "bg-gray-500"
      case "green":
        return "bg-green-500"
      case "navy":
        return "bg-blue-800"
      case "light-blue":
        return "bg-sky-300" // Custom color for the shoe in the image
      case "orange":
        return "bg-orange-500"
      case "beige":
        return "bg-amber-200"
      case "dark-wash":
        return "bg-blue-900"
      case "light-wash":
        return "bg-blue-300"
      default:
        return "bg-gray-200" // Fallback for unknown colors
    }
  }

  // Get wishlist from context
  // const wishlist = state.items;

  // Check if product is already in wishlist
  const isInWishlist = (id)=>{
   const exists = state.items.find(
        (item) => item?.productData?.id === id
      );
        return exists;
    
    }

  

const handleWishList=(product)=>{
  // console.log("test", isInWishlist(product?.id))
 if (isInWishlist(product?.id)) {
  
      dispatch({ type: "REMOVE_ITEM", payload: product?.id });
      toast.success(`Remove from wishlist!`);
    } else {
      dispatch({ type: "ADD_ITEM", payload: { productData: product } });
      toast.success(`Added to wishlist!`);
    }


    
}

// const handleWishList=(product)=>{
// dispatch({ type: "ADD_ITEM", payload: { productData: product } });
// }

  return (
    <Container className="py-8">
      {/* <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Shop</h1> */}

      {/* Filter Section */}
      <div className="bg-white p-3 sm:p-5 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3  xl:grid-cols-5 2xl:grid-cols-6
         gap-4  mb-6">
          {/* Search Bar */}
            <div className="">
            <label htmlFor="search" className="sr-only">
              Search Products
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name..."
              className="w-full h-10 p-2 border border-gray-300 rounded-md
                        focus:ring-2 focus:ring-[#3A9E75]
                        focus:border-[#3A9E75]
                        outline-none transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
     
          {/* Price Sort Dropdown */}
          <div className="relative" ref={priceSortRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md
              flex justify-between
               items-center text-gray-700 hover:bg-gray-50 focus:outline-none 
               focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent
                transition-all duration-200"
              onClick={() => setIsPriceSortDropdownOpen(!isPriceSortDropdownOpen)}
            >
              Sort by:{" "}
              {sortOrder === "lowToHigh" ? "Low to High" : sortOrder === "highToLow" ? "High to Low" : "Featured"}
              <ChevronDown className={`w-4 h-4 transition-transform ${isPriceSortDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isPriceSortDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSortOrder("featured")
                    setIsPriceSortDropdownOpen(false)
                  }}
                >
                  Featured
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSortOrder("lowToHigh")
                    setIsPriceSortDropdownOpen(false)
                  }}
                >
                  Low to High
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSortOrder("highToLow")
                    setIsPriceSortDropdownOpen(false)
                  }}
                >
                  High to Low
                </button>
              </div>
            )}
          </div>

          {/* Brands Filter Dropdown */}
          <div className="relative" ref={brandsRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center
               text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-[#3A9E75]
                focus:border-transparent transition-all duration-200"
              onClick={() => setIsBrandsDropdownOpen(!isBrandsDropdownOpen)}
            >
              Brands {selectedBrand ? `(${selectedBrand})` : ""}
              <ChevronDown className={`w-4 h-4 transition-transform ${isBrandsDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isBrandsDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {allBrands.map((brand) => (
                    <button
                      key={brand}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200
                      ${
                        selectedBrand === brand
                          ? "bg-gray-800 text-white shadow-sm"
                          : "bg-[#ECF5F1] text-gray-700 hover:bg-[#e0f1e9]"
                      }
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                      onClick={() => handleBrandChange(brand)}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
             {/* Categories Filter Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center
               text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-[#3A9E75]
                focus:border-transparent transition-all duration-200"
              onClick={() => setIsCategoryDropdownOpen(!isCatgoryDropdownOpen)}
            >
              Categories {selectedCategory ? `(${selectedCategory})` : ""}
              <ChevronDown className={`w-4 h-4 transition-transform ${isBrandsDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isCatgoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {categories?.map((cat) => (
                    <button
                      key={cat}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200
                      ${
                        selectedCategory === cat
                          ? "bg-gray-800 text-white shadow-sm"
                          : "bg-[#ECF5F1] text-gray-700 hover:bg-[#e0f1e9]"
                      }
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Sizes Filter Dropdown */}
          <div className="relative" ref={sizesRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3A9E75]
               focus:border-transparent transition-all duration-200"
              onClick={() => setIsSizesDropdownOpen(!isSizesDropdownOpen)}
            >
              Sizes {selectedSize ? `(${selectedSize})` : ""}
              <ChevronDown className={`w-4 h-4 transition-transform ${isSizesDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isSizesDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200
                      ${
                        selectedSize === size
                          ? "bg-gray-800 text-white shadow-sm"
                          : "bg-[#ECF5F1] text-gray-700 hover:bg-[#e0f1e9]"
                      }
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colors Filter Dropdown */}
          <div className="relative" ref={colorsRef}>
            <button
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md 
              flex justify-between items-center
               text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-[#3A9E75] focus:border-transparent transition-all duration-200"
              onClick={() => setIsColorsDropdownOpen(!isColorsDropdownOpen)}
            >
              Colors {selectedColor ? `(${selectedColor})` : ""}
              <ChevronDown className={`w-4 h-4 transition-transform ${isColorsDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isColorsDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3 max-h-60 overflow-y-auto">
                <div className="flex flex-wrap gap-3">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${getColorClass(color)} ${selectedColor === color ? "ring-2 ring-offset-2 ring-gray-800" : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-all duration-200`}
                      aria-label={`Filter by ${color} color`}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>  
         
        </div>

        {/* Clear Filters Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedBrand(null) // Reset to null for single selection
              setSelectedSize(null) // Reset to null for single selection
              setSelectedColor(null) // Reset to null for single selection
              setMinPrice(minProductPrice)
              setMaxPrice(maxProductPrice)
              setSortOrder("featured")
            }}
            className="px-4 py-2 bg-[#ECF5F1] text-gray-700 rounded-md hover:bg-[#e3efea] transition-colors duration-200 focus:outline-none "
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div
                         key={product.id}
                         className="bg-white rounded-sm  overflow-hidden transform transition-all duration-300 hover:shadow-lg  cursor-pointer"
                       >
                         <div className="relative w-full h-80">
                           {" "}
                           {/* Increased height for better image display */}
                           <Image
                             src={product?.images[0] || "/placeholder.svg"}
                             alt={product?.name}
                             fill // Use fill to cover the parent div
                             style={{ objectFit: "cover" }} // Ensure image covers the area
                             className="rounded-t-sm" // Apply rounded corners to the top of the image
                           />
                           {product.freeDelivery && (
                             <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                               Free Express Delivery
                             </span>
                           )}
                           <button
                           onClick={()=>handleWishList(product)}
                             className="absolute top-4 right-4 bg-white p-2 rounded-full 
                             shadow-sm hover:scale-105 transition-transform focus:outline-none
                              focus:ring-2 focus:ring-gray-300 cursor-pointer"
                             aria-label="Add to wishlist"
                           >
                             {isInWishlist(product?.id) ? (
          <Heart fill="red" stroke="red" /> 
        ) : (
          <Heart /> 
        )}
        
                             {/* <Heart className="w-5 h-5 text-gray-700" /> */}
                           </button>
                         </div>
                         <div className="p-4">
                           <p className="text-sm text-gray-500 font-medium mb-1">{product?.brand}</p>
                           <Link
                           href={`/product/${product?.id}`}
                           className="text-md font-semibold text-gray-800 mb-2">{product.name}</Link>
                           <div className="flex justify-between items-center">
                             <p className="text-sm font-bold text-[#3A9E75]">৳ {product.price.toFixed(2)}</p>
                             {product.colors && product.colors.length > 0 && (
                               <p className="text-sm text-gray-500">{product.colors.length} Colours</p>
                             )}
                           </div>
                         </div>
                       </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg py-10">No products found matching your criteria.</div>
      )}
    </Container>
  )
}

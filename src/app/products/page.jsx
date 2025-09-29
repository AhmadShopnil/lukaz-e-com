// "use client"

// import { useState, useEffect } from "react"
// import { Search, ShoppingBag, Heart, Star, ArrowRight, Grid, List, Filter, X, Menu } from "lucide-react"

// const products = [
//   {
//     id: 1,
//     name: "Minimalist Leather Wallet",
//     price: 89,
//     originalPrice: 120,
//     image: "/placeholder.svg?height=500&width=400&text=Leather+Wallet",
//     category: "Accessories",
//     rating: 4.8,
//     reviews: 124,
//     isNew: false,
//     isSale: true,
//     colors: ["#8B4513", "#000000", "#654321"],
//   },
//   {
//     id: 2,
//     name: "Classic White Sneakers",
//     price: 159,
//     image: "/placeholder.svg?height=500&width=400&text=White+Sneakers",
//     category: "Footwear",
//     rating: 4.9,
//     reviews: 89,
//     isNew: true,
//     isSale: false,
//     colors: ["#FFFFFF", "#F5F5F5", "#E8E8E8"],
//   },
//   {
//     id: 3,
//     name: "Organic Cotton Tee",
//     price: 45,
//     image: "/placeholder.svg?height=500&width=400&text=Cotton+Tee",
//     category: "Clothing",
//     rating: 4.7,
//     reviews: 203,
//     isNew: false,
//     isSale: false,
//     colors: ["#FFFFFF", "#000000", "#808080"],
//   },
//   {
//     id: 4,
//     name: "Ceramic Coffee Mug",
//     price: 28,
//     originalPrice: 35,
//     image: "/placeholder.svg?height=500&width=400&text=Coffee+Mug",
//     category: "Home",
//     rating: 4.6,
//     reviews: 67,
//     isNew: false,
//     isSale: true,
//     colors: ["#FFFFFF", "#F0E68C", "#DDA0DD"],
//   },
//   {
//     id: 5,
//     name: "Wool Blend Scarf",
//     price: 75,
//     image: "/placeholder.svg?height=500&width=400&text=Wool+Scarf",
//     category: "Accessories",
//     rating: 4.8,
//     reviews: 91,
//     isNew: true,
//     isSale: false,
//     colors: ["#8B4513", "#000000", "#808080"],
//   },
//   {
//     id: 6,
//     name: "Bamboo Phone Case",
//     price: 32,
//     image: "/placeholder.svg?height=500&width=400&text=Phone+Case",
//     category: "Tech",
//     rating: 4.5,
//     reviews: 156,
//     isNew: false,
//     isSale: false,
//     colors: ["#DEB887", "#8B4513", "#654321"],
//   },
//   {
//     id: 7,
//     name: "Minimalist Watch",
//     price: 199,
//     originalPrice: 249,
//     image: "/placeholder.svg?height=500&width=400&text=Watch",
//     category: "Accessories",
//     rating: 4.9,
//     reviews: 342,
//     isNew: false,
//     isSale: true,
//     colors: ["#C0C0C0", "#FFD700", "#000000"],
//   },
//   {
//     id: 8,
//     name: "Wireless Earbuds",
//     price: 129,
//     image: "/placeholder.svg?height=500&width=400&text=Earbuds",
//     category: "Tech",
//     rating: 4.7,
//     reviews: 278,
//     isNew: true,
//     isSale: false,
//     colors: ["#FFFFFF", "#000000", "#808080"],
//   },
// ]

// const categories = ["All", "Clothing", "Accessories", "Footwear", "Home", "Tech"]

// export default function MinimalShop() {
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [cartCount, setCartCount] = useState(0)
//   const [favorites, setFavorites] = useState(new Set())
//   const [viewMode, setViewMode] = useState("grid")
//   const [isLoaded, setIsLoaded] = useState(false)
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [priceRange, setPriceRange] = useState([0, 300])
//   const [sortBy, setSortBy] = useState("featured")

//   useEffect(() => {
//     setIsLoaded(true)
//   }, [])

//   const filteredProducts = products.filter((product) => {
//     const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
//     return matchesCategory && matchesSearch && matchesPrice
//   })

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case "price-low":
//         return a.price - b.price
//       case "price-high":
//         return b.price - a.price
//       case "rating":
//         return b.rating - a.rating
//       case "newest":
//         return b.isNew - a.isNew
//       default:
//         return 0
//     }
//   })

//   const addToCart = (productId) => {
//     setCartCount((prev) => prev + 1)
//     // Add a subtle animation feedback
//     const button = document.querySelector(`[data-product-id="${productId}"]`)
//     if (button) {
//       button.classList.add("animate-pulse")
//       setTimeout(() => button.classList.remove("animate-pulse"), 600)
//     }
//   }

//   const toggleFavorite = (productId) => {
//     setFavorites((prev) => {
//       const newFavorites = new Set(prev)
//       if (newFavorites.has(productId)) {
//         newFavorites.delete(productId)
//       } else {
//         newFavorites.add(productId)
//       }
//       return newFavorites
//     })
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <div className="flex items-center">
//               <h1 className="text-2xl font-light tracking-wide text-gray-900">MINIMAL</h1>
//             </div>

//             {/* Navigation */}
//             <nav className="hidden md:flex items-center space-x-12">
//               <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
//                 Shop
//               </a>
//               <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
//                 About
//               </a>
//               <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
//                 Contact
//               </a>
//             </nav>

//             {/* Actions */}
//             <div className="flex items-center space-x-6">
//               <button className="text-gray-500 hover:text-gray-900 transition-colors">
//                 <Search className="w-5 h-5" />
//               </button>
//               <button onClick={() => toggleFavorite()} className="text-gray-500 hover:text-gray-900 transition-colors">
//                 <Heart className="w-5 h-5" />
//               </button>
//               <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
//                 <ShoppingBag className="w-5 h-5" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden text-gray-500 hover:text-gray-900 transition-colors duration-200"
//               >
//                 <Menu className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden bg-white border-t border-gray-100">
//             <div className="px-4 py-4 space-y-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//               <nav className="space-y-2">
//                 <a href="#" className="block text-sm font-medium text-gray-900 py-2">
//                   Shop
//                 </a>
//                 <a href="#" className="block text-sm font-medium text-gray-600 py-2">
//                   About
//                 </a>
//                 <a href="#" className="block text-sm font-medium text-gray-600 py-2">
//                   Contact
//                 </a>
//               </nav>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Hero Section */}
//       <section className="relative py-24 px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <div
//             className={`transform transition-all duration-1000 ease-out ${
//               isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//             }`}
//           >
//             <h2 className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight">
//               Curated
//               <br />
//               <span className="font-normal">Essentials</span>
//             </h2>
//             <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
//               Thoughtfully designed products for the modern lifestyle. Quality over quantity, always.
//             </p>
//             <button className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors group">
//               <span className="font-medium">Explore Collection</span>
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </section>

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters */}
//           <aside className={`lg:w-80 ${isFilterOpen ? "block" : "hidden lg:block"}`}>
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={() => setIsFilterOpen(false)}
//                   className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Mobile Search */}
//               <div className="sm:hidden mb-6">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//               </div>

//               {/* Categories */}
//               <div className="mb-8">
//                 <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
//                 <div className="space-y-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
//                         selectedCategory === category
//                           ? "bg-gray-900 text-white shadow-md"
//                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-8">
//                 <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between text-sm text-gray-600">
//                     <span>${priceRange[0]}</span>
//                     <span>${priceRange[1]}</span>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="range"
//                       min="0"
//                       max="300"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//                     />
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <input
//                       type="number"
//                       value={priceRange[0]}
//                       onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
//                       className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="Min"
//                     />
//                     <span className="text-gray-400">-</span>
//                     <input
//                       type="number"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 300])}
//                       className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="Max"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Sort By */}
//               <div>
//                 <h4 className="font-medium text-gray-900 mb-4">Sort By</h4>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="rating">Highest Rated</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1">
//             {/* Results Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {selectedCategory === "All" ? "All Products" : selectedCategory}
//                 </h2>
//                 <p className="text-gray-600 mt-1">{sortedProducts.length} products found</p>
//               </div>

//               <div className="flex items-center space-x-4">
//                 {/* Desktop Search */}
//                 <div className="hidden sm:block relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 w-64"
//                   />
//                 </div>

//                 <button
//                   onClick={() => setIsFilterOpen(!isFilterOpen)}
//                   className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <Filter className="w-4 h-4" />
//                   <span>Filter</span>
//                 </button>

//                 <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`p-2 rounded-md transition-all duration-200 ${
//                       viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
//                     }`}
//                   >
//                     <Grid className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`p-2 rounded-md transition-all duration-200 ${
//                       viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
//                     }`}
//                   >
//                     <List className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid/List */}
//             <div
//               className={`grid gap-12 ${
//                 viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"
//               }`}
//             >
//               {sortedProducts.map((product, index) => (
//                 <div
//                   key={product.id}
//                   className={`group cursor-pointer transform transition-all duration-500 ${
//                     isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//                   } ${viewMode === "list" ? "flex space-x-8" : ""}`}
//                   style={{ transitionDelay: `${index * 100}ms` }}
//                 >
//                   {/* Product Image */}
//                   <div
//                     className={`relative overflow-hidden bg-gray-50 ${
//                       viewMode === "list" ? "w-80 h-80 flex-shrink-0" : "aspect-[4/5]"
//                     }`}
//                   >
//                     <img
//                       src={product.image || "/placeholder.svg"}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                     />

//                     {/* Badges */}
//                     <div className="absolute top-4 left-4 flex flex-col space-y-2">
//                       {product.isNew && (
//                         <span className="bg-gray-900 text-white text-xs px-3 py-1 font-medium">NEW</span>
//                       )}
//                       {product.isSale && (
//                         <span className="bg-gray-600 text-white text-xs px-3 py-1 font-medium">SALE</span>
//                       )}
//                     </div>

//                     {/* Favorite Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         toggleFavorite(product.id)
//                       }}
//                       className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     >
//                       <Heart
//                         className={`w-4 h-4 ${
//                           favorites.has(product.id) ? "fill-gray-900 text-gray-900" : "text-gray-600"
//                         }`}
//                       />
//                     </button>

//                     {/* Quick Add Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         addToCart(product.id)
//                       }}
//                       data-product-id={product.id}
//                       className="absolute bottom-4 left-4 right-4 bg-gray-900 text-white py-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>

//                   {/* Product Info */}
//                   <div className={`${viewMode === "list" ? "flex-1 py-4" : "pt-6"}`}>
//                     <div className="flex items-start justify-between mb-2">
//                       <div>
//                         <h3 className="font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
//                           {product.name}
//                         </h3>
//                         <p className="text-sm text-gray-500">{product.category}</p>
//                       </div>
//                     </div>

//                     {/* Colors */}
//                     <div className="flex items-center space-x-2 mb-4">
//                       {product.colors.map((color, colorIndex) => (
//                         <div
//                           key={colorIndex}
//                           className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
//                           style={{ backgroundColor: color }}
//                         />
//                       ))}
//                     </div>

//                     {/* Rating */}
//                     <div className="flex items-center space-x-2 mb-4">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-3 h-3 ${
//                               i < Math.floor(product.rating) ? "fill-gray-400 text-gray-400" : "text-gray-200"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-500">({product.reviews})</span>
//                     </div>

//                     {/* Price */}
//                     <div className="flex items-center space-x-2">
//                       <span className="text-lg font-medium text-gray-900">${product.price}</span>
//                       {product.originalPrice && (
//                         <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Load More */}
//             <div className="text-center mt-12">
//               <button className="bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-200 transform hover:scale-105">
//                 Load More Products
//               </button>
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Newsletter */}
//       <section className="bg-gray-50 py-20 px-6 lg:px-8">
//         <div className="max-w-2xl mx-auto text-center">
//           <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Stay Updated</h3>
//           <p className="text-gray-600 mb-8 text-lg">
//             Subscribe to receive updates on new arrivals and exclusive offers.
//           </p>
//           <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-6 py-4 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
//             />
//             <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

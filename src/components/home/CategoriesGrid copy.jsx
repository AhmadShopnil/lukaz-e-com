// "use client"
// import { useFilter } from '@/context/FilterContext';
// import { getCategories } from '@/utils/actions';
// import { getImageUrl } from '@/utils/helpers';
// import Image from 'next/image';
// import Link from 'next/link';



// const CategoriesGrid = ({categories}) => {
 
//   const { dispatch:dispatchFilterProduct } = useFilter();


//     const handleFilter=(cat)=>{
//     // dispatchFilterProduct({ type: "SET_COLOR", payload: "red" });
//     dispatchFilterProduct({ type: "SET_CATEGORIES", payload: cat });
//     }


//   return (
//     <section className="py-10 bg-gradient-to-r from-[#8ae5bf] via-[#68bf9b] to-[#70bf9c]">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl font-semibold text-white">Shop by Category</h2>
//         <p className="text-white mt-1 text-sm md:text-base">Find your perfect pair by category</p>
//       </div>

//       <div className="mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 md:gap-4">
//         {categories.slice(5,15).map((category, idx) => (
         
//           <Link
//           onClick={()=>handleFilter(category?.id)}
//           href={`/shop/${category?.slug}`}
//             key={idx}
//             className="bg-white rounded-md overflow-hidden shadow-md  cursor-pointer h-[200px] flex flex-col"
//           >
//             <div className="relative w-full h-[350px] bg-gray-200">
             
//               <Image
              
//                 src={getImageUrl("category",category?.thumbnail)}
//                 alt={category.name}
//                 fill
//                 className="object-cover md:hover:scale-105 transition-transform duration-500 "
//               />
//             </div>

//             <div 
            
//             className="p-2 text-center flex-1 flex items-center justify-center">
//               <h3 className="text-sm font-medium text-gray-800">{category?.name}</h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategoriesGrid;

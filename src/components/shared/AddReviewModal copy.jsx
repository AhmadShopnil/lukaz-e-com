// import { useState } from "react"

// export const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     rating: 0,
//     title: "",
//     content: "",
//     name: "",
//     email: "",
//     images: [],
//   })
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }))
//     }
//   }

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files)
//     if (files.length + formData.images.length > 3) {
//       setErrors((prev) => ({ ...prev, images: "Maximum 3 images allowed" }))
//       return
//     }
//     setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
//   }

//   const removeImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }))
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (formData.rating === 0) newErrors.rating = "Please select a rating"
//     if (!formData.title.trim()) newErrors.title = "Title is required"
//     if (!formData.content.trim()) newErrors.content = "Review content is required"
//     if (!formData.name.trim()) newErrors.name = "Name is required"
//     if (!formData.email.trim()) newErrors.email = "Email is required"
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateForm()) return

//     setIsSubmitting(true)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
//       onSubmit(formData)
//       setFormData({ rating: 0, title: "", content: "", name: "", email: "", images: [] })
//       onClose()
//     } catch (error) {
//       console.error("Error submitting review:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//         <div className="p-8">
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="text-2xl font-bold text-gray-900">Write a Review</h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Rating */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-3">Your Rating *</label>
//               <div className="flex gap-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => handleInputChange("rating", star)}
//                     className="transition-transform hover:scale-110"
//                   >
//                     <StarIcon
//                       filled={star <= formData.rating}
//                       className={`w-8 h-8 ${
//                         star <= formData.rating ? "text-amber-400" : "text-gray-300 hover:text-amber-200"
//                       }`}
//                     />
//                   </button>
//                 ))}
//               </div>
//               {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
//             </div>

//             {/* Title */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Review Title *</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => handleInputChange("title", e.target.value)}
//                 placeholder="Summarize your experience"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
//             </div>

//             {/* Content */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Your Review *</label>
//               <textarea
//                 value={formData.content}
//                 onChange={(e) => handleInputChange("content", e.target.value)}
//                 placeholder="Tell others about your experience with this product"
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//               />
//               {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
//             </div>

//             {/* Images */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Add Photos (Optional)</label>
//               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   id="image-upload"
//                 />
//                 <label htmlFor="image-upload" className="cursor-pointer">
//                   <div className="text-gray-500">
//                     <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                       />
//                     </svg>
//                     <p className="font-medium">Click to upload images</p>
//                     <p className="text-sm">Maximum 3 images</p>
//                   </div>
//                 </label>
//               </div>
//               {formData.images.length > 0 && (
//                 <div className="flex gap-3 mt-3">
//                   {formData.images.map((image, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={URL.createObjectURL(image) || "/placeholder.svg"}
//                         alt={`Upload ${index + 1}`}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
//             </div>

//             {/* Personal Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name *</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   placeholder="Enter your name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex gap-4 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }



// const StarIcon = ({ filled = true, className = "w-5 h-5" }) => (
//   <svg
//     className={`${className} ${filled ? "text-amber-400" : "text-gray-300"}`}
//     fill="currentColor"
//     viewBox="0 0 20 20"
//   >
//     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//   </svg>
// )


// const VerifiedIcon = ({ className = "w-4 h-4" }) => (
//   <svg className={`${className} text-emerald-500`} fill="currentColor" viewBox="0 0 20 20">
//     <path
//       fillRule="evenodd"
//       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//       clipRule="evenodd"
//     />
//   </svg>
// )
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import toast from 'react-hot-toast';
import axiosInstance from "@/utils/axiosInstance";
import { getImageUrl } from "@/utils/helpers";

 const locations = [
    {
      name: "Main Office",
      address: "123 Business Street, Suite 100, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      image:"/images/branch/1.jpg"
    },
    {
      name: "West Coast Branch",
      address: "456 Innovation Ave, San Francisco, CA 94102",
      phone: "+1 (555) 987-6543",
      image:"/images/branch/2.jpg"
    },
    {
      name: "European Office",
      address: "789 Tech Boulevard, London, UK EC1A 1BB",
      phone: "+44 20 7123 4567",
      image:"/images/branch/3.jpg"
    },
  ]


export default function ContactPage({outlets}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("from data",formData)
   


 try {
     setIsSubmitting(true)
    
     await axiosInstance.post("/contracts", formData);
    //  console.log("response for sent msg:", res?.data)

     toast.success(` Successfully Message Sent`);
     setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (err) {
      const message =
      err?.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);

      toast.error(`Something went wrong. Please try again.`);

    } finally {
     setIsSubmitting(false)
     
    }



    
  }

 

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
     <div className="bg-[#3A9E75] text-white py-16">
       <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We're Here to Help!</h1>
          <p className="text-xl opacity-90">Get in touch with us and let's start a conversation</p>
        </div>
      </motion.div>
     </div>

      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
        className="bg-[#E6F4EF]  py-12 "
      >
      <div className="mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:grid-rows-1">
          {/* Contact Form */}
        <motion.div variants={fadeInVariants} className="bg-white rounded-sm shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "phone", "message"].map((field, idx) => (
              <motion.div key={idx} variants={fadeInVariants}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-2 capitalize"
                >
                  {field === "message" ? "Message" : field.replace(/^\w/, (c) => c.toUpperCase())}
                </label>
                {field !== "message" ? (
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required={field !== "phone" && field !== "message" ? true : false}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent outline-none transition-all"
                    placeholder={`Enter your ${field}`}
                  />
                ) : (
                  <textarea
                    id={field}
                    name={field}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#3A9E75] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                )}
              </motion.div>
            ))}

            <motion.div variants={fadeInVariants} className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3A9E75] hover:bg-[#368a67]  text-white font-semibold py-3 px-6 rounded-sm transition-colors duration-200"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitMessage && (
                <div className="text-green-600 font-medium text-center bg-green-50 p-3 rounded-lg">
                  {submitMessage}
                </div>
              )}
            </motion.div>
          </form>
        </motion.div>

        {/* Outlets Information */}
        <motion.div variants={fadeInVariants} className="">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 
          "><span className="border-b-4 border-b-[#3A9E75]">Out</span>lets</h2>
          <motion.div variants={staggerContainer} className=" gap-4 grid grid-cols-1 sm:grid-cols-2 ">
            {outlets.map((outlet, idx) => (
              <motion.div
                    key={idx}
                    variants={fadeInVariants}
                    className="bg-white rounded-md shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Branch Image */}
                    <div className="w-full h-48 overflow-hidden  ">
                      <img
                       src={getImageUrl("branch",outlet?.image)}
                        alt={outlet?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-md">{outlet?.name}</h3>
                    <p className="text-gray-600 text-sm my-1">{outlet?.address}</p>
                    <p className="text-gray-600 font-medium text-sm">{outlet?.contact}</p>
                    </div>
                  </motion.div>

            ))}
          </motion.div>
        </motion.div>
      </div>
      </motion.div>
 {/* Contact Information */}
         

      {/* Map Section and contact info*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-6 sm:py-10 mx-auto max-w-[1640px] px-3 sm:px-4 md:px-16"
      >
        {/* <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us On Map</h2> */}
      <div className="flex flex-col md:flex-row gap-4">
         {/* Contact Information */}
        <div className="bg-white rounded-md shadow-sm p-4 sm:p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#3A9E75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Available 24/7 for urgent matters</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#3A9E75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">contact@company.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#3A9E75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Business Street, Suite 100</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#3A9E75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-[#3A9E75] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-[#3A9E75] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-[#3A9E75] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md shadow-sm overflow-hidden w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className=" inset-0"
          />
        </div>
        
      </div>
      </motion.div>


      
    </div>
  )
}

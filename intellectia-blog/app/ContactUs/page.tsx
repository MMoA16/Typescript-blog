"use client";

import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { MapPin, Phone, Mail } from "lucide-react";
import CareerSection from "@/app/ContactUs/CareerSection";
import { useState, useEffect } from "react";

const ContactMap = dynamic(() => import("./ContactMap"), { ssr: false });

export type ContactContainerType = {
  className?: string;
};

async function getStrapiData(url: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + url, { cache: "no-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const ContactUs: NextPage<ContactContainerType> = () => {
  const [logoURL, setLogoURL] = useState("");
  

  const [formData, setFormData] = useState({
    firstName: "",
    // lastName: "",
    email: "",
    // phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    // lastName: "",
    email: "",
    // phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
      const { Logo } = strapiHomeData.data.attributes;
      setLogoURL("http://localhost:1337" + Logo.data.attributes.url);
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    //if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    //if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thanks! We've received your message.");
        setFormData({ firstName: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
     
      <Nav logoURL={logoURL} />

      <div className="relative mb-108">
        <div className="bg-gray-800 text-black py-28 px-7 md:px-5">
          <div className="md:px-20 font-dm-sans">
            <p className="text-3xl md:text-19xl font-semibold text-white pt-10 mb-3">
              We're Here to Help
            </p>
            <p className="text-base  md:text-xl font-normal text-white">
              Looking for a legal Partner? You Found.
            </p>
          </div>
        </div>
      </div>

       <div className="relative flex flex-col md:flex-col lg:flex-row bg-white rounded-sm p-6 md:p-12 font-dm-sans z-10 gap-8">
  {/* CONTACT INFO LEFT */}
  <div className="lg:w-2/5 bg-white ml-1 p-6 rounded-md border border-gray-200">
    <div className="px-0 md:px-5">
    <h2 className="text-xl font-semibold mb-4 text-[#b43a2f]">Contact Info</h2>
 
    <div className="flex items-center gap-3 mb-3">
      <a
        href="https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5951297,17z/data=!4m8!3m7!1s0x3bae15d13a793489:0xe5f93f75c0c87a66!8m2!3d12.961518!4d77.5951297"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-gray-700 no-underline"
      >
        <MapPin className="w-6 h-6 no-underline" />
        <p className="no-underline text-base md:text-lg ">
          123 Main Street, Mumbai, Maharashtra, India
        </p>
      </a>
    </div>

    <div className="flex items-center gap-3 mb-3">
       <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-700 no-underline ">
        <Phone className="w-6 h-6" />
        <p className="text-base md:text-lg">+91-9876543210</p>
  </a>
    </div>

    <div className="flex items-center gap-3">
      <a href="mailto:contact@bodhankarassociates.com" className="flex items-center gap-3 text-gray-700 no-underline">
        <Mail className="w-6 h-6" />
        <p className="text-base md:text-lg">contact@bodhankarassociates.com</p>
      </a>
    </div>
  </div>
  </div>
  {/* FORM RIGHT */}
  <div className="ml-3 md:ml-10 mt-0 md:-mt-56 md:w-2.5/5 bg-gray-50 p-6 md:p-14 rounded-sm shadow-md">

    <div className="text-center mb-8">
      <h2 className="text-xl md:text-4xl font-semibold text-[#0a4d6e] mb-2">
        Your Goals, Our Mission &ndash; Let's Connect
      </h2>
      <p className="text-gray-600 text-sm md:text-base">
        Experience top-tier legal guidance for every stage of your journey.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-7 mt-3 -ml-2">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 -ml-2">Enter your name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border font-dm-sans border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f] -ml-2"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        {/* <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f] "
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div> */}
        <div>
          <label className="block text-sm font-medium mb-1 -ml-2">Enter your email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border font-dm-sans border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f] -ml-2 "
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        {/* <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f]"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div> */}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 -ml-2">Enter your message</label>
        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border font-dm-sans border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#b43a2f] -ml-2"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <div className="-mx-3">
        <button
          type="submit"
          className="w-full bg-[#b43a2f] text-white font-semibold py-3 ml-1 rounded-sm hover:bg-[#a13328] transition"
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
</div>

{/* MAP SECTION BELOW – STAYS AT BOTTOM ON ALL SCREENS */}
<div className="mt-16 mb-16 flex justify-center">
  <ContactMap /> {/* Replace with your dynamic map import */}
</div>



      {/* <div className="pt-12 md:pt-36 pb-10 bg-white text-gray-700">
        <div className="flex justify-center">
          <Map />
        </div>
      </div> */}

      <div className="bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto">
          <CareerSection />
        </div>
      </div>

      <Footer />
      
    </>
    
  );
};

export default ContactUs;

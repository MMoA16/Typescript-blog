// app/ContactUs/EnquireForm.tsx
"use client";

import { useState, useEffect } from "react";

type Props = {
  onClose: () => void;
};

export default function EnquireForm({ onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
        // Disable scroll on open
        document.body.style.overflow = 'hidden';

        // Re-enable scroll on unmount
        return () => {
            document.body.style.overflow = '';
        };
        }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle submission logic here
    console.log({ name, email, enquiryType, description });
  };

  return (
    <div className="bg-white p-8 rounded-lg  max-w-lg shadow-lg relative font-dm-sans overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold mb-4">Submit an Enquiry</h2>
      <p className="mb-4 text-sm text-gray-600">
        Ask us about our services, partnerships, or any business-related questions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="e.g. Maya Verma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[95%] border border-gray-400 rounded-md font-dm-sans px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="e.g. your@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[95%] border border-gray-400 rounded-md font-dm-sans px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        {/* Enquiry Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type</label>
          <select
            value={enquiryType}
            onChange={(e) => setEnquiryType(e.target.value)}
            className="w-full border border-gray-400 rounded-md px-1 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          >
            <option value="">Select an option</option>
            <option value="Business Partnership">Business Partnership</option>
            <option value="Media/Press">Media/Press</option>
            <option value="Legal">Legal</option>
            <option value="Services">Services</option>
            <option value="Job">Job Queries</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Tell us more about your enquiry"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-[95%] border border-gray-400 rounded-md font-dm-sans px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-800 text-white font-dm-sans font-medium px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-opacity-85 transition"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}

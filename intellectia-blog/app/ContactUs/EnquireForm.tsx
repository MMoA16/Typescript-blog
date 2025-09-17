
"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, XCircle } from "lucide-react";
import { Oval } from "react-loader-spinner";

type Props = {
  onClose: () => void;
};

export default function EnquireForm({ onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // ✅ Unified scroll lock
  useEffect(() => {
    const shouldLockScroll = isModalOpen || loading || true; // always lock when form is open
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, loading]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email";
    if (!enquiryType.trim()) newErrors.enquiryType = "Enquiry type is required";
    if (!description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleChange = (field: string, value: string) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "enquiryType") setEnquiryType(value);
    if (field === "description") setDescription(value);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/enquiry/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, enquiryType, description }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setModalType("success");
        setIsError(false);
        setModalMessage("Thanks! We've received your message.");
        setName("");
        setEmail("");
        setEnquiryType("");
        setDescription("");
      } else {
        setModalType("error");
        setIsError(true);
        setModalMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setModalType("error");
      setIsError(true);
      setModalMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-lg shadow-lg relative font-dm-sans max-h-[90vh] overflow-y-auto">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <Oval
            height={60}
            width={60}
            color="#ffffff"
            secondaryColor="#e0e0e0"
            strokeWidth={4}
            strokeWidthSecondary={4}
            ariaLabel="loading"
          />
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative w-11/12 max-w-lg bg-white rounded-sm shadow-lg font-dm-sans animate-modalFadeIn">
            {/* Top Border */}
            <div
              className={`w-full h-1 ${
                modalType === "success" ? "bg-gray-800" : "bg-[#b43a2f]"
              }`}
            />

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 rounded-full py-1 hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="px-6 py-4 text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                {modalType === "success" ? (
                  <>
                    <CheckCircle className="text-gray-800 w-6 h-6" />
                    <h3 className="text-lg font-semibold text-blue-950">
                      WooHoo!
                    </h3>
                  </>
                ) : (
                  <>
                    <XCircle className="text-[#b43a2f] w-6 h-6" />
                    <h3 className="text-lg font-semibold text-[#b43a2f]">
                      Oops!
                    </h3>
                  </>
                )}
              </div>

              <p className="text-gray-700 mb-4">{modalMessage}</p>

              {modalType === "error" && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-white px-4 py-2 font-dm-sans font-medium cursor-pointer rounded-md hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
      >
        &times;
      </button>

      {/* Form */}
      <h2 className="text-2xl font-semibold mb-4">Submit an Enquiry</h2>
      <p className="mb-4 text-sm text-gray-600">
        Ask us about our services, partnerships, or any business-related
        questions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="e.g. Maya Verma"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-[95%] border rounded-md font-dm-sans px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-400 focus:ring-gray-900"
            }`}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1 text-left">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="e.g. your@example.com"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`w-[95%] border rounded-md font-dm-sans px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-400 focus:ring-gray-900"
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1 text-left">{errors.email}</p>
          )}
        </div>

        {/* Enquiry Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enquiry Type
          </label>
          <select
            value={enquiryType}
            onChange={(e) => handleChange("enquiryType", e.target.value)}
            className={`w-full border rounded-md px-1 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 ${
              errors.enquiryType
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-400 focus:ring-gray-900"
            }`}
          >
            <option value="">Select an option</option>
            <option value="Business Partnership">Business Partnership</option>
            <option value="Media/Press">Media/Press</option>
            <option value="Legal">Legal</option>
            <option value="Services">Services</option>
            <option value="Job">Job Queries</option>
            <option value="Other">Other</option>
          </select>
          {errors.enquiryType && (
            <p className="text-red-600 text-xs mt-1 text-left">
              {errors.enquiryType}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Tell us more about your enquiry"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-[95%] border rounded-md font-dm-sans px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-400 focus:ring-gray-900"
            }`}
          />
          {errors.description && (
            <p className="text-red-600 text-xs mt-1 text-left">
              {errors.description}
            </p>
          )}
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

'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { usePathname } from "next/navigation";

interface InternshipFormProps {
  onClose: () => void;
}

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function InternshipForm({ onClose }: InternshipFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [university, setUniversity] = useState('');
  const [location, setLocation] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [graduationStatus, setGraduationStatus] = useState('');
  const [batch, setBatch] = useState('');
  const [practise,setPractise] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const pathname = usePathname();
  if (pathname !== "/ContactUs/Careers") return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => setSelectedFile(null);

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCountryCode('+91');
    setGraduationStatus('');
    setLocation('');
    setUniversity('');
    setBatch('');
    setPractise('');
    setDescription('');
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    const templateParams = {
      firstName,
      lastName,
      email,
      phone: `${countryCode} ${phone}`,
      graduationStatus,
      university,
      location,
      currentYear,
      batch,
      practise,
      description,
      fileName: selectedFile?.name || 'No file uploaded',
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      alert('Internship application sent successfully!');
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Failed to send internship application. Please try again.');
    }
  };

  return (
    <div className="inset-0 flex items-start justify-center font-dm-sans">
      <div className="bg-white w-full max-w-3xl rounded-md shadow-lg relative flex flex-col h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-200 -mb-10 -ml-3">
          <h3 className="text-lg font-semibold text-black">Internship Application</h3>
          <p className="text-sm text-gray-500 -mt-3">Fill in your details to apply for an internship.</p>
        </div>

        {/* Scrollable content */}
        <div className="px-6 md:px-8 py-6 flex-1 space-y-8 -ml-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 -mt-1">

             <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">First name</label>
              <input
                type="text"
                placeholder="Rajesh"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-11/12 border border-gray-400 rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Last name</label>
              <input
                type="text"
                placeholder="Kumar"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-11/12 border border-gray-400 rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Phone</label>
              <div className="flex">
                <span className="flex items-center pl-4 pr-4 rounded-l-md border border-gray-400 bg-black text-xs text-white">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-400 rounded-r-md pl-2 pr-14 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-11/12 border border-gray-400 rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">
                Graduation Status
              </label>
              <select
                value={graduationStatus}
                onChange={(e) => setGraduationStatus(e.target.value)}
                className="w-full border border-gray-400 rounded-md py-2 px-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">Status</option>
                <option value="Graduated">Graduated</option>
                <option value="Not Graduated">Not Graduated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Area of Expertise</label>
              <select
               value={practise}
               onChange={(e) => setPractise(e.target.value)}
               className="w-full border border-gray-400 rounded-md px-2 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option value="">Select Expertise</option>
                <option value="Corporate">Corporate</option>
                <option value="Employment Law">Employment Law</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Dispute Resolutions">Dispute Resolution</option>
                <option value="Tax">Tax</option>
                <option value="Technology Law">Technology Law</option>
                <option value="Government">Government</option>
                <option value="Others">Others</option>
              </select>
            </div>

           

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">College/University Name</label>
              <input
                type="text"
                placeholder="XYZ University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-11/12 border border-gray-400 rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Current location</label>
              <input
                type="text"
                placeholder="Bengaluru"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-11/12 border border-gray-400 rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">
                Current Year in Course
              </label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full border border-gray-400 rounded-md py-2 px-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">Select Year</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Batch Year</label>
              <input
                type="number"
                placeholder="2025"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-11/12 border border-gray-400 rounded-md px-3 py-2 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-black mb-3 text-left ml-1">Upload your Resume</label>
            <div className="w-12/12 border-2 border-dashed border-gray-400 rounded-md p-6 text-center text-sm text-gray-500 relative">
              {!selectedFile ? (
                <>
                  <p className="mb-2">Choose a file or drag & drop it here.</p>
                  <p className="mb-4">pdf, doc, docx, jpeg – Up to 50MB</p>
                  <label htmlFor="resumeUpload">
                    <span className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-85 cursor-pointer">
                      Browse Files
                    </span>
                  </label>
                  <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpeg,.jpg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  <span className="truncate">{selectedFile.name}</span>
                  <button
                    onClick={handleRemoveFile}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 text-left ml-1">Description</label>
            <textarea
              rows={3}
              placeholder="Briefly outline your skills, experience, or achievements."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[97%] border border-gray-400 rounded-md px-2 py-4 text-sm font-dm-sans resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Footer buttons */}
        
         <div className="max-w-[43.5rem] p-6 border-t border-gray-200 flex justify-between items-center gap-2">
            {/* Left Side - Close */}
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 rounded-md border cursor-pointer bg-red-500 text-white border-none hover:bg-opacity-90 font-dm-sans font-medium"
            >
              Close
            </button>

            {/* Right Side - Reset + Submit */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm px-4 py-2 rounded-md border border-black hover:bg-gray-100 font-dm-sans font-medium"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-black text-white cursor-pointer text-sm px-4 py-2 rounded-md hover:bg-opacity-85 font-dm-sans font-medium"
              >
                Submit
              </button>
            </div>
          </div>



      </div>
    </div>
  );
}

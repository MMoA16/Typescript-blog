"use client";
import { useState } from "react";
import Divider from "@/components/divider";

export default function CareersSection() {
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hr@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 px-6 font-dm-sans text-[#1a1a1a] relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <button className="inline-flex text-sm border font-dm-sans border-black rounded-full px-10 py-3 font-bold hover:bg-black hover:text-white transition">
            We're hiring!
          </button>
          <h1 className="text-21xl font-semibold">Be part of our mission</h1>
          <p className="text-black -mt-3 font-medium">
            We're looking for passionate people to join us on our mission. We
            value flat hierarchies, clear communication, full ownership and
            responsibility.
          </p>
        </div>

        {/* Job Listings */}
        {[
          {
            title: "Get in Touch with HR",
            desc: "Our HR team is here to help with hiring and employee support.",
            btnText: "Connect",
            tags: ["Hiring Support", "Talent Engagement"],
            isHR: true,
          },
          {
            title: "Reach Out to the Media Team",
            desc: "For press, branding, or legal content inquiries, our media team ensures clear and professional communication.",
            href: "/media-contact",
            btnText: "Collaborate",
            tags: ["Media & Press", "Brand Communication"],
            isHR: false,
          },
        ].map((job, idx, arr) => (
          <div key={idx}>
            <div className="border-t py-6 flex justify-between items-start flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600 mb-3">{job.desc}</p>

                <div className="flex gap-2 text-sm flex-wrap">
                  {job.tags.map((tag, tagIdx) => (
                    <button
                      key={tagIdx}
                      className="border border-black rounded-full px-5 py-3 font-semibold font-dm-sans hover:bg-gray-100 transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {job.isHR ? (
                <button
                  onClick={() => setShowDialog(true)}
                  className="font-dm-sans font-medium text-base no-underline bg-black text-white mt-1 px-5 py-3 rounded-full flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                  {job.btnText}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              ) : (
                <a
                  href={job.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md font-medium no-underline bg-black text-white mt-1 px-5 py-3 rounded-full flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                  {job.btnText}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              )}
            </div>

            {idx < arr.length - 1 && (
              <div className="mt-4 mb-4 -ml-7 lg:-ml-20">
                <Divider />
              </div>
            )}
          </div>
        ))}

        {/* Modal Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative font-dm-sans">
              <h2 className="text-xl font-semibold mb-2">Contact HR</h2>
              <p className="mb-4 text-sm">
                Email: <span className="font-medium">hr@example.com</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="bg-black text-white px-4 py-2 rounded-full text-sm hover:opacity-90"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="border border-gray-400 px-4 py-2 rounded-full text-sm hover:bg-gray-100"
                >
                  Close
                </button>
              </div>

              {copied && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full shadow-sm transition-opacity duration-300">
                  Copied!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

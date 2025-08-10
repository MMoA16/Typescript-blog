import React from "react";

type Props = {
  active: "internship" | "jobs" | null;
  setActive: React.Dispatch<React.SetStateAction<"internship" | "jobs" | null>>;
};

export default function SlidingToggleButtons({ active, setActive }: Props) {
  return (
    <div className="inline-flex bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setActive("internship")}
        className={`relative px-7 py-3 rounded-full font-semibold text-lg cursor-pointer   font-dm-sans transition-colors duration-300 ${
          active === "internship"
            ? "bg-white shadow text-black"
            : "text-gray-600 hover:text-white hover:bg-gray-800"
        }`}
      >
        Internship
      </button>
      <button
        onClick={() => setActive("jobs")}
        className={`relative px-7 py-3 rounded-full font-semibold text-lg cursor-pointer  font-dm-sans transition-colors duration-300 ${
          active === "jobs"
            ? "bg-white shadow text-black"
            : "text-gray-800 hover:text-white hover:bg-gray-800"
        }`}
      >
        Jobs
      </button>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export interface TeamMember {
//   id: number;
//   attributes: {
//     TeamMemberName: string;
//     TeamMemberDesignation: string;
//     TeamMemberSlug: string; 
//     TeamMemberPhoto?: { data?: { attributes?: { url?: string } } };
//   };
// }

// interface TeamListProps {
//   teamMembers: TeamMember[];
// }

// const TeamList: React.FC<TeamListProps> = ({ teamMembers }) => {
//   return (
//     <>
//       {/* Team Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
//         {teamMembers.map((member) => {
//           const imageUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
//             ? `http://localhost:1337${member.attributes.TeamMemberPhoto.data.attributes.url}`
//             : "/placeholder.jpg";

//           return (
//             <Link
//               key={member.id}
//               href={`/AboutUs/our-team/${member.attributes.TeamMemberSlug}`} // ✅ use new slug
//               className="bg-white rounded-sm shadow-md overflow-hidden no-underline hover:shadow-lg transition-transform duration-300 cursor-pointer hover:scale-105"
//             >
//               <div className="relative w-full h-[200px] md:h-[430px]">
//                 <Image
//                   src={imageUrl}
//                   alt={`${member.attributes.TeamMemberName}'s photo`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 40vw"
//                   className="object-cover object-[center_15%]"
//                 />
//               </div>
//               <div className="p-2 text-center">
//                 <h2 className="font-semibold text-lg font-dm-sans text-gray-800">
//                   {member.attributes.TeamMemberName}
//                 </h2>
//                 <p className="text-gray-500 font-dm-sans">
//                   {member.attributes.TeamMemberDesignation}
//                 </p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default TeamList;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

export interface TeamMember {
  id: number;
  attributes: {
    TeamMemberName: string;
    TeamMemberDesignation: string;
    TeamMemberSlug: string; 
    TeamMemberPhoto?: { data?: { attributes?: { url?: string } } };
  };
}

interface TeamListProps {
  teamMembers: TeamMember[];
}

const TeamList: React.FC<TeamListProps> = ({ teamMembers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(teamMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const currentMembers = teamMembers.slice(startIndex, startIndex + membersPerPage);

  return (
    <>
      {/* Team Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
        {currentMembers.map((member) => {
          const imageUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
            ? `http://localhost:1337${member.attributes.TeamMemberPhoto.data.attributes.url}`
            : "/placeholder.jpg";

          return (
            <Link
              key={member.id}
              href={`/AboutUs/our-team/${member.attributes.TeamMemberSlug}`}
              className="bg-white rounded-sm shadow-md overflow-hidden no-underline hover:shadow-lg transition-transform duration-300 cursor-pointer hover:scale-105"
            >
              <div className="relative w-full h-[200px] md:h-[430px]">
                <Image
                  src={imageUrl}
                  alt={`${member.attributes.TeamMemberName}'s photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[center_15%]"
                />
              </div>
              <div className="p-2 text-center">
                <h2 className="font-semibold text-lg font-dm-sans text-gray-800">
                  {member.attributes.TeamMemberName}
                </h2>
                <p className="text-gray-500 font-dm-sans">
                  {member.attributes.TeamMemberDesignation}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-10 font-dm-sans">
          {/* Prev button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 md:px-7 py-2 md:py-4 font-dm-sans mr-5 text-2xl flex items-center gap-2 ${
              currentPage === 1
                ? "hidden"
                : "bg-gray-800 text-white hover:bg-gray-600 cursor-pointer"
            }`}
          >
            <LuMoveLeft size={18} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 md:px-5 py-2 md:py-4 font-dm-sans font-semibold text-2xl ${
                currentPage === index + 1
                  ? "bg-transparent border-2 border-gray-800 text-gray-800"
                  : "cursor-pointer hover:bg-gray-800 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 md:px-7 py-2 md:py-4 font-dm-sans ml-5 text-2xl flex items-center gap-2 ${
              currentPage === totalPages
                ? "bg-gray-800 text-white hover:bg-gray-600 cursor-pointer"
                : "bg-gray-800 text-white hover:bg-gray-600 cursor-pointer"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <LuMoveRight size={18} />
          </button>
        </div>
      )}
    </>
  );
};

export default TeamList;

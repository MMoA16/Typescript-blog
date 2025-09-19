"use client";

import Image from "next/image";
import Link from "next/link";

export interface TeamMember {
  id: number;
  attributes: {
    TeamMemberName: string;
    TeamMemberDesignation: string;
    TeamMemberslug: string; 
    TeamMemberPhoto?: { data?: { attributes?: { url?: string } } };
  };
}

interface TeamListProps {
  teamMembers: TeamMember[];
}

const TeamList: React.FC<TeamListProps> = ({ teamMembers }) => {
  return (
    <>
      {/* Team Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
        {teamMembers.map((member) => {
          const imageUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
            ? `http://localhost:1337${member.attributes.TeamMemberPhoto.data.attributes.url}`
            : "/placeholder.jpg";

          return (
            <Link
              key={member.id}
              href={`/AboutUs/${member.attributes.TeamMemberslug}`} // ✅ use new slug
              className="bg-white rounded-sm shadow-md overflow-hidden no-underline hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative w-full h-[200px] md:h-[450px]">
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
    </>
  );
};

export default TeamList;

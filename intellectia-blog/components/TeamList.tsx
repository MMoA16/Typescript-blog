// components/TeamList.tsx
"use client";

interface TeamMember {
  id: number;
  attributes: {
    TeamMemberName: string;
    TeamMemberDesignation: string;
    TeamMemberNumber: string;
    TeamMemberPhoto?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const Card = ({ teamMember }: { teamMember: TeamMember }) => {
  const imageUrl = teamMember.attributes.TeamMemberPhoto?.data?.attributes?.url
    ? `http://localhost:1337${teamMember.attributes.TeamMemberPhoto.data.attributes.url}`
    : "/placeholder.jpg";

  return (
    <div className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={imageUrl}
        alt={`${teamMember.attributes.TeamMemberName}'s photo`}
        className=" w-full h-[200px] md:h-[450px] object-cover object-[center_15%]"
      />
      <div className="p-0 md:p-4 text-center">
        {/* <h2 className="font-semibold font-dm-sans !text-sm md:!text-xl ">{teamMember.attributes.TeamMemberName}</h2>*/}
       <h2 className="font-semibold font-dm-sans text-[12px] md:text-[24px]">
              {teamMember.attributes.TeamMemberName}
            </h2>

            <p className="text-gray-500 text-[10px] md:text-[16px] font-dm-sans">
              {teamMember.attributes.TeamMemberDesignation}
            </p>
      </div>
    </div>
  );
};

export default function TeamList({ teamMembers }: { teamMembers: TeamMember[] }) {

  //   const sortedMembers = [...teamMembers].sort((a, b) => {
  //   const numA = (a.attributes as any).TeamMemberNumber ?? 0;
  //   const numB = (b.attributes as any).TeamMemberNumber ?? 0;
  //   return numA - numB;
  // });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {teamMembers.map((member) => (
        <Card key={member.id} teamMember={member} />
      ))}
    </div>
  );
}

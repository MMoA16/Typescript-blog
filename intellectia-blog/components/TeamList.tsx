
// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { X } from "lucide-react";

// // ✅ Define TeamMember interface
// interface TeamMember {
//   id: number;
//   attributes: {
//     TeamMemberName: string;
//     TeamMemberDesignation: string;
//     TeamMemberNumber?: number;
//     TeamMemberEmail?: string;
//     TeamMemberLinkedIn?: string;
//     TeamMemberPhone?: string;
//     TeamMemberPhoto?: {
//       data?: {
//         attributes?: {
//           url?: string;
//         };
//       };
//     };
//   };
// }

// const Card = ({
//   teamMember,
//   onClick,
// }: {
//   teamMember: TeamMember;
//   onClick: () => void;
// }) => {
//   const imageUrl = teamMember.attributes.TeamMemberPhoto?.data?.attributes?.url
//     ? `http://localhost:1337${teamMember.attributes.TeamMemberPhoto.data.attributes.url}`
//     : "/placeholder.jpg";

//   return (
//     <div
//       className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="relative w-full h-[200px] md:h-[450px]">
//         <Image
//           src={imageUrl}
//           alt={`${teamMember.attributes.TeamMemberName}'s photo`}
//           fill
//           sizes="(max-width: 768px) 100vw, 33vw"
//           className="object-cover object-[center_15%]"
//         />
//       </div>
//       <div className="p-0 md:p-4 text-center">
//         <h2 className="font-semibold font-dm-sans text-[12px] md:text-[24px]">
//           {teamMember.attributes.TeamMemberName}
//         </h2>
//         <p className="text-gray-500 text-[10px] md:text-[16px] font-dm-sans">
//           {teamMember.attributes.TeamMemberDesignation}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function TeamList({ teamMembers }: { teamMembers: TeamMember[] }) {
//   const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

//   return (
//     <>
//       {/* Team Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {teamMembers.map((member) => (
//           <Card
//             key={member.id}
//             teamMember={member}
//             onClick={() => setSelectedMember(member)}
//           />
//         ))}
//       </div>

//       {/* Dialog */}
//       <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
//   <div className="sm:max-w-[600px] md:max-w-[700px] w-full max-h-[80vh] overflow-y-auto">
//     {/* header */}
//     <div className="flex justify-between items-center p-4">
//       <h2 className="text-xl font-bold">{selectedMember?.attributes.TeamMemberName}</h2>
//       <button onClick={() => setSelectedMember(null)}>
//         <X className="w-5 h-5" />
//       </button>
//     </div>

//     {/* body */}
//     {selectedMember && (
//       <div className="flex flex-col md:flex-row gap-6 p-4">
//         {/* Image */}
//         <div className="relative w-full md:w-1/2 h-[250px] md:h-[350px]">
//           <Image
//             src={
//               selectedMember.attributes.TeamMemberPhoto?.data?.attributes?.url
//                 ? `http://localhost:1337${selectedMember.attributes.TeamMemberPhoto.data.attributes.url}`
//                 : "/placeholder.jpg"
//             }
//             alt={`${selectedMember.attributes.TeamMemberName}'s photo`}
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>

//         {/* Info */}
//         <div className="flex-1 space-y-3">
//           <p className="text-lg font-semibold">
//             {selectedMember.attributes.TeamMemberDesignation}
//           </p>
//           <p>Email: {selectedMember.attributes.TeamMemberEmail || "N/A"}</p>
//           <p>Phone: {selectedMember.attributes.TeamMemberPhone || "N/A"}</p>
//           {selectedMember.attributes.TeamMemberLinkedIn && (
//             <a
//               href={selectedMember.attributes.TeamMemberLinkedIn}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               LinkedIn Profile
//             </a>
//           )}
//         </div>
//       </div>
//     )}
//   </div>
// </Dialog>

//     </>
//   );
// }

// components/TeamList.tsx
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";

// import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
// import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";

// export interface TeamMember {
//   id: number;
//   attributes: {
//     TeamMemberName: string;
//     TeamMemberDesignation: string;
//     TeamMemberPhoto?: { data?: { attributes?: { url?: string } } };
//     TeamMemberPhone?: string;
//     TeamMemberEmail?: string;
//     TeamMemberLinkedinLink?: string;
//     TeamMemberDescription?: string;
//   };
// }

// interface TeamListProps {
//   teamMembers: TeamMember[];
// }

// const TeamList: React.FC<TeamListProps> = ({ teamMembers }) => {
//   const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

//   return (
//     <>
//       {/* Team Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
//         {teamMembers.map((member) => {
//           const imageUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
//             ? `http://localhost:1337${member.attributes.TeamMemberPhoto.data.attributes.url}`
//             : "/placeholder.jpg";

//           return (
//             <div
//               key={member.id}
//               className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//               onClick={() => setSelectedMember(member)}
//             >
//               <div className="relative w-full h-[200px] md:h-[450px]">
//                 <Image
//                   src={imageUrl}
//                   alt={`${member.attributes.TeamMemberName}'s photo`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   className="object-cover object-[center_15%]"
//                 />
//               </div>
//               <div className="p-2 text-center">
//                 <h2 className="font-semibold text-lg font-dm-sans">
//                   {member.attributes.TeamMemberName}
//                 </h2>
//                 <p className="text-gray-500 font-dm-sans">
//                   {member.attributes.TeamMemberDesignation}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Sliding Dialog */}
//       <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
//         {selectedMember && (
//           <DialogContent className="overflow-hidden">
//             <div className="flex flex-col md:flex-row">
//               {/* Left: Photo */}
//               <div className="relative w-full md:w-1/2 h-[350px] md:h-[706px]">
//                 {/* Close Button */}
               

//                 <Image
//                   src={
//                     selectedMember.attributes.TeamMemberPhoto?.data?.attributes?.url
//                       ? `http://localhost:1337${selectedMember.attributes.TeamMemberPhoto.data.attributes.url}`
//                       : "/placeholder.jpg"
//                   }
//                   alt={selectedMember.attributes.TeamMemberName}
//                   fill
//                   className="object-cover"
//                 />

//                 {/* Name Overlay */}
//                 <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2">
//                   <DialogTitle>
//                     <h2 className="text-lg font-semibold font-dm-sans">
//                       {selectedMember.attributes.TeamMemberName}
//                     </h2>
//                   </DialogTitle>
//                 </div>
//               </div>

//               {/* Right: Info */}
//               <div className="p-6 space-y-4 md:w-1/2">


//                <button
//                   onClick={() => setSelectedMember(null)}
//                   className="absolute top-3 right-3 bg-black/10 text-white py-1 px-2 hover:bg-black/70"
//                 >
//                   ✕
//                 </button>

//                 <p className="font-semibold text-lg font-dm-sans">
//                   {selectedMember.attributes.TeamMemberDesignation}
//                 </p>

//                 {/* Contact Icons */}
//                 <div className="flex gap-4">
//                   {/* Email */}
//                   <a
//                     href={`mailto:${selectedMember.attributes.TeamMemberEmail || ""}`}
//                     className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1f2397] text-white hover:bg-white hover:text-[#1f2397] transition-colors"
//                   >
//                     <FontAwesomeIcon icon={faEnvelope as IconProp} className="w-5 h-5" />
//                   </a>

//                   {/* Phone */}
//                   <a
//                     href={`tel:${selectedMember.attributes.TeamMemberPhone || ""}`}
//                     className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1f2397] text-white hover:bg-white hover:text-[#1f2397] transition-colors"
//                   >
//                     <FontAwesomeIcon icon={faPhone as IconProp} className="w-5 h-5" />
//                   </a>

//                   {/* LinkedIn */}
//                   {selectedMember.attributes.TeamMemberLinkedinLink && (
//                     <a
//                       href={selectedMember.attributes.TeamMemberLinkedinLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1f2397] text-white hover:bg-white hover:text-[#1f2397] transition-colors"
//                     >
//                       <FontAwesomeIcon icon={faLinkedinIn as IconProp} className="w-5 h-5" />
//                     </a>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <p className="font-dm-sans">
//                   {selectedMember.attributes.TeamMemberDescription ||
//                     "No description available."}
//                 </p>
//               </div>
//             </div>
//           </DialogContent>
//         )}
//       </Dialog>
//     </>
//   );
// };

// export default TeamList;
"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";



export interface TeamMember {
  id: number;
  attributes: {
    TeamMemberName: string;
    TeamMemberDesignation: string;
    TeamMemberPhoto?: { data?: { attributes?: { url?: string } } };
    TeamMemberPhone?: string;
    TeamMemberEmail?: string;
    TeamMemberLinkedinLink?: string;
    TeamMemberDescription?: string;
    TeamMemberEducation?: string;
    TeamMemberExpertise?:string;
  };
}

interface TeamListProps {
  teamMembers: TeamMember[];
}

const AccordionItem = ({
  title,
  content,
  justify = false, // ✅ optional prop
}: {
  title: string;
  content: React.ReactNode;
  justify?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-3 text-left font-medium mt-4 cursor-pointer"
      >
        <span className="font-dm-sans font-medium text-lg">{title}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div
          className={`pb-20  bg-gray-50 text-gray-700 font-dm-sans ${
            justify ? "text-justify" : "text-left"
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const TeamList: React.FC<TeamListProps> = ({ teamMembers }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      {/* Team Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
        {teamMembers.map((member) => {
          const imageUrl = member.attributes.TeamMemberPhoto?.data?.attributes?.url
            ? `http://localhost:1337${member.attributes.TeamMemberPhoto.data.attributes.url}`
            : "/placeholder.jpg";

          return (
            <div
              key={member.id}
              className="bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative w-full h-[200px] md:h-[450px]">
                <Image
                  src={imageUrl}
                  alt={`${member.attributes.TeamMemberName}'s photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-[center_15%]"
                />
              </div>
              <div className="p-2 text-center">
                <h2 className="font-semibold text-lg font-dm-sans">
                  {member.attributes.TeamMemberName}
                </h2>
                <p className="text-gray-500 font-dm-sans">
                  {member.attributes.TeamMemberDesignation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sliding Dialog */}
      {/* Sliding Dialog */}
{/* <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
  {selectedMember && (
    <DialogContent className="overflow-hidden relative">
      <div className="flex flex-col md:flex-row">
       
        <div className="relative w-full md:w-1/2 h-[350px] md:h-[706px]">
          <Image
            src={
              selectedMember.attributes.TeamMemberPhoto?.data?.attributes?.url
                ? `http://localhost:1337${selectedMember.attributes.TeamMemberPhoto.data.attributes.url}`
                : "/placeholder.jpg"
            }
            alt={selectedMember.attributes.TeamMemberName}
            fill
            className="object-cover"
          />

          
          <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2">
            <DialogTitle>
              <h2 className="text-lg font-semibold font-dm-sans">
                {selectedMember.attributes.TeamMemberName}
              </h2>
            </DialogTitle>
          </div>
        </div>

        
        <div className="p-6 space-y-4 md:w-1/2">
         
          <button
            onClick={() => setSelectedMember(null)}
            className="absolute top-3 right-3 bg-black/10 text-white py-1 px-2 hover:bg-black/70"
          >
            ✕
          </button>

          
          <AccordionItem title="Designation" content={selectedMember.attributes.TeamMemberDesignation} />
          <AccordionItem
            title="Email"
            content={
              selectedMember.attributes.TeamMemberEmail ? (
                <a
                  href={`mailto:${selectedMember.attributes.TeamMemberEmail}`}
                  className="text-blue-600 underline"
                >
                  {selectedMember.attributes.TeamMemberEmail}
                </a>
              ) : (
                "Not available"
              )
            }
          />
          <AccordionItem
            title="LinkedIn"
            content={
              selectedMember.attributes.TeamMemberLinkedinLink ? (
                <a
                  href={selectedMember.attributes.TeamMemberLinkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Profile
                </a>
              ) : (
                "Not available"
              )
            }
          />

         
          <AccordionItem
            title="Description"
            content={selectedMember.attributes.TeamMemberDescription || "No description available."}
            justify
          />

          <AccordionItem
            title="Education"
            content={selectedMember.attributes.TeamMemberEducation || "Not available"}
          />
        </div>
      </div>
    </DialogContent>
  )}
</Dialog> */}
  
     <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
  {selectedMember && (
    <DialogContent className="w-full max-h-full overflow-y-auto p-0  ">
      {/* Top section with background image */}
      <div className="relative h-[455px] w-full bg-gray-200">


       <button
            onClick={() => setSelectedMember(null)}
            className="absolute top-3 right-3 z-50 bg-black/10 text-white py-1 px-2 hover:bg-black/70"
          >
            ✕
          </button>


        {selectedMember.attributes.TeamMemberPhoto?.data?.attributes?.url && (
          <Image
            src={`http://localhost:1337${selectedMember.attributes.TeamMemberPhoto.data.attributes.url}`}
            alt={selectedMember.attributes.TeamMemberName}
            fill
            className="object-cover  object-[center_40%] z-0"
          />
        )}

        {/* Name in top-left */}
        {/* <div className="absolute bottom-1  text-white text-5xl font-dm-sans font-bold drop-shadow">
          {selectedMember.attributes.TeamMemberName}
        </div> */}

        {/* Center designation + line */}
        <div className="absolute w-full bottom-0 font-dm-sans  text-white bg-black/40 ">
          <h2 className="text-5xl font-extrabold">
            {selectedMember.attributes.TeamMemberDesignation}
          </h2>
        </div>
      </div>

  {/* Bottom section styled like screenshot */}
{/* Bottom section styled like screenshot */}
        <div
          style={{
            backgroundColor: "white",
            borderTop: "2px solid black",
            fontSize: "0.75rem",
            color: "#374151",
          }}
        >
          {/* Top label row */}
          <div
            style={{
              // borderBottom: "1px solid black",
              fontFamily: "DM Sans, sans-serif",
              fontSize:"20px",
              padding: "0.5rem 1rem",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Overview
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              borderTop: "2px solid black",
            }}
          >
            {/* Name */}
            <div
              style={{
                padding: "0.10rem",
                // borderBottom: "2px solid black",
                textAlign: "center",
                fontFamily: "DM Sans, sans-serif", 
                
              }}
            >
              <p style={{ color: "#6B7280",fontSize:"16px",fontWeight:500 }}>Name</p>
              {selectedMember.attributes.TeamMemberName ? (
                <p style={{fontSize:"18px",fontWeight:600}}>{selectedMember.attributes.TeamMemberName}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9CA3AF",fontSize:"18px" }}>N/A</p>
              )}
            </div>
            </div>
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              borderTop: "2px solid black",
            }}
          >
           
            <div
              style={{
                padding: "0.25rem",
                borderRight: "2px solid black",
                textAlign: "center",
                fontFamily: "DM Sans, sans-serif" 
              }}
            >
              <p style={{ color: "#6B7280",fontSize:"16px",fontWeight:500  }}>Phone</p>
              {selectedMember.attributes.TeamMemberPhone ? (
                <p style={{fontSize:"16px",fontWeight:600,color:"#374151", letterSpacing: "2px" }}>+91-{selectedMember.attributes.TeamMemberPhone}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9CA3AF" }}>N/A</p>
              )}
            </div>

            
            <div
                style={{
                  padding: "0.25rem",
                  // borderRight: "2px solid black",
                  textAlign: "center",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                <p style={{ color: "#6B7280", fontSize: "16px", fontWeight: 500 }}>Email</p>
                {selectedMember.attributes.TeamMemberEmail ? (
                  <p style={{ fontSize: "16px", fontWeight: 600 }}>
                    <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedMember.attributes.TeamMemberEmail}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{  textDecoration: "none",color:"#374151" }}
                    >
                      {selectedMember.attributes.TeamMemberEmail}
                    </a>
                  </p>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#9CA3AF" }}>N/A</p>
                )}
              </div>


           
            
          </div> 

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              borderTop: "2px solid black",
            }}
          >
           
            
                       
            <div style={{ padding: "0.25rem",borderRight: "2px solid black", textAlign: "center",fontFamily: "DM Sans, sans-serif"  }}>
              <p style={{ color: "#6B7280",fontSize:"16px",fontWeight:500 }}>LinkedIn</p>
              {selectedMember.attributes.TeamMemberLinkedinLink ? (
                <a
                  href={selectedMember.attributes.TeamMemberLinkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "DM Sans, sans-serif",fontSize:"16px",textDecorationLine:"none",color:"#374151",fontWeight:600  }}
                >
                  View Profile
                </a>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9CA3AF" }}>N/A</p>
              )}
            </div>

         
          
          
            <div
              style={{
                padding: "0.25rem",
                // borderRight: "2px solid black",
                textAlign: "center",
                fontFamily: "DM Sans, sans-serif" 
              }}
            >
              <p style={{ color: "#6B7280",fontSize:"16px",fontWeight:500  }}>Education</p>
              {selectedMember.attributes.TeamMemberEducation ? (
                <p style={{fontSize:"16px",fontWeight:600,color:"#374151"}}>{selectedMember.attributes.TeamMemberEducation}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9CA3AF" }}>N/A</p>
              )}
            </div>


 

          </div> 

              



          {/* Second row: Description + Education stacked */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              borderTop: "2px solid black",
            }}
          >
            {/* Description */}
            <div
              style={{
                padding: "0.75rem",
                borderBottom: "2px solid black",
                textAlign: "center",
                fontFamily: "DM Sans, sans-serif", 
                display: "flex",
                flexDirection: "column",
                justifyContent:"center"
                
              }}
            >
              <p style={{ color: "#6B7280",fontSize:"16px",fontWeight:500   }}>Professional Background</p>
              {selectedMember.attributes.TeamMemberDescription ? (
                <p style={{ fontSize:"16px",fontWeight:600 }}>{selectedMember.attributes.TeamMemberDescription}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9CA3AF" }}>N/A</p>
              )}
            </div>

            {/* Education */}
            <div style={{ padding: "0.75rem", textAlign: "center",fontFamily: "DM Sans, sans-serif"  }}>
              <p style={{ color: "#6B7280",fontSize:"16px",fontWeight:500   }}>Related Practices</p>
              {selectedMember.attributes.TeamMemberExpertise ? (
                <p style={{ fontSize:"16px",fontWeight:600 }}>{selectedMember.attributes.TeamMemberExpertise}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#9CA3AF" }}>N/A</p>
              )}
            </div>
          </div>
        </div>



    </DialogContent>
  )}
</Dialog>





    </>
  );
};

export default TeamList;



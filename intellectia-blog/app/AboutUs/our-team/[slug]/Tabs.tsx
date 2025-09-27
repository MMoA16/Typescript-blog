// "use client";
// import FloatingDock from "./FloatingDock";

// interface MemberAttributes {
//   TeamMemberDescription?: string;
//   TeamMemberExpertise?: string | string[];
//   TeamMemberEducation?: string;
//   TeamMemberLanguage?:string;
//   TeamMemberRelatedSectors?:string;
// }

// interface Member {
//   attributes: MemberAttributes;
// }

// interface MemberTabsProps {
//   member?: Member;
// }

// export default function MemberTabs({ member }: MemberTabsProps) {
//   if (!member) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 font-dm-sans text-gray-700">
//         <p>Loading member information...</p>
//       </div>
//     );
//   }

//   // Reusable button component (styled like your uploaded image)
//   const StyledButton = ({ text }: { text: string }) => (
//     <div className="inline-flex items-center gap-3 px-6 py-2  
//       bg-gray-800  shadow-md text-white font-medium mr-4 mb-3
//       transition-opacity duration-200 hover:opacity-95 hover:scale-105 cursor-pointer">
//       <span className=" p-1 text-white ">
//             <svg
//                 className="w-5 h-5 mt-1"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//             >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//             </span>

//       <span className="tracking-wide">{text}</span>
      
//     </div>
//   );

//   // Normalize related sectors into an array
// const sectorsList =
//   typeof member.attributes.TeamMemberRelatedSectors === "string"
//     ? member.attributes.TeamMemberRelatedSectors.split(",").map((s) => s.trim())
//     : member.attributes.TeamMemberRelatedSectors || [];


//   // Normalize expertise into an array
//   const expertiseList =
//     typeof member.attributes.TeamMemberExpertise === "string"
//       ? member.attributes.TeamMemberExpertise.split(",").map((e) => e.trim())
//       : member.attributes.TeamMemberExpertise || [];

//   return (
//     <div className="font-dm-sans text-gray-700">

//          <FloatingDock/>


//     <div className="flex flex-col md:flex-row p-6 md:p-14">

//       <div className="max-w-5xl mx-auto border border-green-900 p-6 bg-white space-y-6 text-justify">
//         {member.attributes.TeamMemberDescription && (
//           <section>
//             <h2 className="text-17xl font-semibold text-gray-800 mb-2">Overview</h2>
//             <div className="mt-4 mb-4">
//               <div className="w-full h-px sm:h-0.5 bg-black" />
//             </div>
//           <div className="space-y-4 text-lg md:text-xl tracking-wide">
//       {member.attributes.TeamMemberDescription
//         .split(/\n\s*\n/) // split into paragraphs by double line breaks
//         .map((para, idx) => (
//           <p key={idx}>
//             {para.split(/\n/).map((line, lineIdx) => (
//               <span key={lineIdx}>
//                 {line}
//                 {lineIdx < para.split(/\n/).length - 1 && <br />}
//               </span>
//             ))}
//           </p>
//         ))}
//     </div>
//           </section>
//         )}

        


//           {member.attributes.TeamMemberEducation && (
//           <section>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Education Details</h2>
//             <div className="mt-4 mb-4">
//               <div className="w-full h-px sm:h-0.5 bg-black" />
//             </div>
//             <p className=" text-lg md:text-xl" >{member.attributes.TeamMemberEducation}</p>
//           </section>
//         )}

         


//              {sectorsList.length > 0 && (
//           <section>
//             <h2 className="text-xl font-semibold text-gray-800 mb-8">Related Sectors</h2>
//             <div className="mt-4 mb-4">
//               <div className="w-full h-px sm:h-0.5 bg-black" />
//             </div>
//             <div className="flex flex-wrap">
//               {sectorsList.map((sector, idx) => (
//                 <StyledButton key={idx} text={sector} />
//               ))}
//             </div>
//           </section>
          
//         )}

       

//         {member.attributes.TeamMemberLanguage && (
//             <section>
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-10">Spoken Languages</h2>
//                 <div className="mt-4 mb-4">
//                 <div className="w-full h-px sm:h-0.5 bg-black" />
//                 </div>

//                 <div className="flex flex-wrap">
//                 {member.attributes.TeamMemberLanguage.split(",").map((lang, index) => (
//                     <div
//                     key={index}
//                     className="inline-flex items-center px-1 py-2  
//                          mr-1 mb-3
//                         "
//                     >
//                     <span className="p-1 text-gray-800">
//                 <svg
//                     className="w-3 h-2 mt-1"
//                     fill="currentColor"
//                     viewBox="0 0 8 8"
//                 >
//                     <circle cx="4" cy="4" r="3" />
//                 </svg>
//                 </span>


//                     <span className="tracking-wide  text-lg md:text-xl">{lang.trim()}</span>
//                     </div>
//                 ))}
//                 </div>
//             </section>
//             )}


//       </div>
   


//        <div className="bg-gray-400 font-dm-sans p-6 h-[320px] mt-8 ml-4">
//         {sectorsList.length > 0 && (
//           <section>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Practise Areas</h2>
//             {/* <div className="mt-4 mb-4">
//               <div className="w-full h-px sm:h-0.5 bg-black" />
//             </div> */}
//             <div className="flex flex-wrap">
//               {expertiseList.map((exp, index) => (
//                 <StyledButton key={index} text={exp} />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>



//     </div>

//     </div>
//   );
// }


"use client";

import FloatingDock from "./FloatingDock";

interface MemberAttributes {
  TeamMemberDescription?: string;
  TeamMemberExpertise?: string | string[];
  TeamMemberEducation?: string;
  TeamMemberLanguage?: string;
  TeamMemberRelatedSectors?: string;
}

interface Member {
  attributes: MemberAttributes;
}

interface MemberTabsProps {
  member?: Member;
}

export default function MemberTabs({ member }: MemberTabsProps) {
  if (!member) {
    return (
      <div className="max-w-4xl mx-auto p-6 font-dm-sans text-gray-700">
        <p>Loading member information...</p>
      </div>
    );
  }

  const StyledButton = ({ text }: { text: string }) => (
    <div
      className="inline-flex items-center gap-3 px-6 py-2  
      bg-gray-800 shadow-md text-white font-medium mr-4 mb-3
      transition-opacity duration-200 hover:opacity-95 hover:scale-105 cursor-pointer"
    >
      <span className="p-1 text-white">
        <svg
          className="w-5 h-5 mt-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </span>
      <span className="tracking-wide">{text}</span>
    </div>
  );

  // Normalize lists
  const sectorsList =
    typeof member.attributes.TeamMemberRelatedSectors === "string"
      ? member.attributes.TeamMemberRelatedSectors.split(",").map((s) => s.trim())
      : member.attributes.TeamMemberRelatedSectors || [];

  const expertiseList =
    typeof member.attributes.TeamMemberExpertise === "string"
      ? member.attributes.TeamMemberExpertise.split(",").map((e) => e.trim())
      : member.attributes.TeamMemberExpertise || [];

  return (
    <div className="font-dm-sans text-gray-700 relative">
      {/* Floating Dock */}
      <FloatingDock />

      <div className="flex flex-col md:flex-row p-6 md:p-14">

        
        <div className="max-w-5xl mx-auto border border-green-900 p-6 bg-white space-y-6 text-justify">
          {/* Overview */}
          {member.attributes.TeamMemberDescription  && (
            <section id="overview" >
              <h2 className="text-17xl font-semibold text-gray-800 mb-2">Overview</h2>
              <div className="mt-4 mb-4">
                <div className="w-full h-px sm:h-0.5 bg-black" />
              </div>
              <div className="space-y-4 text-lg md:text-xl tracking-wide">
                {member.attributes.TeamMemberDescription.split(/\n\s*\n/).map(
                  (para, idx) => (
                    <p key={idx}>
                      {para.split(/\n/).map((line, lineIdx) => (
                        <span key={lineIdx}>
                          {line}
                          {lineIdx < para.split(/\n/).length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )
                )}
              </div>
            </section>
          )}

          {/* Education */}
          {member.attributes.TeamMemberEducation && (
            <section id="education" >
              <h2 className="text-17xl font-semibold text-gray-800 mt-16 mb-2">
                Education Details
              </h2>
              <div className="mt-4 mb-4">
                <div className="w-full h-px sm:h-0.5 bg-black" />
              </div>
              <p className="text-lg md:text-xl">
                {member.attributes.TeamMemberEducation}
              </p>
            </section>
          )}

          {/* Related Sectors */}
          {sectorsList.length > 0 && (
            <section id="related-sectors" >
              <h2 className="text-17xl font-semibold text-gray-800 mt-16 mb-2">
                Related Sectors
              </h2>
              <div className="mt-4 mb-4">
                <div className="w-full h-px sm:h-0.5 bg-black" />
              </div>
              <div className="flex flex-wrap">
                {sectorsList.map((sector, idx) => (
                  <StyledButton key={idx} text={sector} />
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {member.attributes.TeamMemberLanguage && (
            <section id="languages" >
              <h2 className="text-17xl font-semibold text-gray-800 mt-16 mb-2">
                Spoken Languages
              </h2>
              <div className="mt-4 mb-4">
                <div className="w-full h-px sm:h-0.5 bg-black" />
              </div>
              <div className="flex flex-wrap">
                {member.attributes.TeamMemberLanguage.split(",").map(
                  (lang, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-1 py-2 mr-1 mb-3"
                    >
                      <span className="p-1 text-gray-800">
                        <svg
                          className="w-3 h-2 mt-1"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </span>
                      <span className="tracking-wide text-lg md:text-xl">
                        {lang.trim()}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>
          )}
        </div>

        {/* Practise Areas */}
        <div
          id="practise-areas"
          className="bg-gray-400 font-dm-sans p-6 h-[320px] mt-8 ml-4"
        >
          {expertiseList.length > 0 && (
            <section>
              <h2 className="text-17xl font-semibold text-gray-800 mb-2">
                Practise Areas
              </h2>
              <div className="flex flex-wrap">
                {expertiseList.map((exp, index) => (
                  <StyledButton key={index} text={exp} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

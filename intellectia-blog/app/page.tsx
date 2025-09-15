// import type { NextPage } from "next";
// import Nav from "../components/nav";
// import AboutContainer from "../components/about-container";
// import Blogs from "../components/blogs";
// import Mission from "@/components/mission";
// import Divider from "@/components/divider";
// import Footer from "@/components/Footer/Footer";
// import DisclaimerModal from "@/components/Disclaimer";
// import PracticeCarousel from "@/components/PracticeCarousel"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocation } from "@fortawesome/free-solid-svg-icons";
// import { Key } from "react";
// import Link from "next/link";
// import CardNew from "@/components/CardNew";
// import CarouselNew from "@/components/CarouselNew";
// import CollapsibleDropdown from "@/components/CollpasibleDropdown";

// async function getStrapiData(url:string){
//   const baseURL="http://localhost:1337";
//   try{
//     const response = await fetch(baseURL + url,{cache:'no-cache'});
//     const data= await response.json();
//     return data;
//   }catch(error){
//     console.error(error);
//   }
// }


  
// const Home: NextPage = async() => {


//   const baseURL = "http://localhost:1337";
//   const strapiData = await getStrapiData("/api/home-page?populate=*");
//   const strapiBlogData = await getStrapiData("/api/posts?populate=*");
//   const strapiBlogData1 = await getStrapiData("/api/posts/1?populate=*");
//   const strapiBlogData2 = await getStrapiData("/api/posts/2?populate=*");
//   const {Title,description, MissionLine, Disclaimer, HomePageCarousel,Logo} = strapiData.data.attributes;
//   const imageUrl = baseURL + strapiBlogData2.data.attributes.cover.data.attributes.url;
//   const logoURL=baseURL+Logo.data.attributes.url;



//   //console.log(strapiBlogData1.data.attributes)
//   return (
    
//      // {/* <div className="w-[1512px] hidden flex-col items-start justify-start"> */}
//        // {/* /*<div className="self-stretch flex flex-row items-center justify-between py-10 px-20"> */}
//           /* <div className="w-[821px] flex flex-col items-start justify-start p-2.5 box-border">
//             <div className="self-stretch flex flex-row items-start justify-start gap-[40px]">
//               <div className="flex-1 relative font-dm-serif-display">
//                 WeclerMcgill
//               </div>
//               <div className="flex-1 relative">Home</div>
//               <div className="flex-1 relative">About</div>
//               <div className="flex-1 relative">Case Studies</div>
//               <div className="flex-1 relative">Practice Areas</div>
//             </div>
//           </div>  */
//           /* <div className="flex flex-row items-center justify-between">
//             <div className="relative">+8197482349</div>
//             <div className="w-[199px] relative bg-gray-200 h-[47px] text-center text-lg text-gray-100">
//               <div className="absolute top-[12px] left-[24px] font-medium">
//                 Free Consultation
//               </div>
//             </div>
//           </div> */
//         /* </div>  */
//         /* <div className="self-stretch h-[704px] flex flex-row items-center justify-center py-10 px-20 box-border text-lg">
//           <div className="flex-1 flex flex-row items-center justify-start gap-[40px]">
//             <div className="flex-1 flex flex-row items-center justify-start p-2">
//               <div className="w-[100px] relative inline-block h-[23px] shrink-0">
//                 Our Mission
//               </div>
//             </div>
//             <div className="flex-1 flex flex-row items-center justify-start text-109xl font-dm-serif-display">
//               <div className="flex-1 relative leading-[128px]">
//                 We are the last line of defence for the little guy
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="self-stretch flex flex-row items-center justify-start py-0 px-20">
//           <div className="flex-1 bg-black h-px" />
//         </div>
//       </div> */
      
// <>

//         <DisclaimerModal disclaimer={Disclaimer}/>
//         <Nav logoURL={logoURL}/>
        
//         <PracticeCarousel HomePageCarousel={HomePageCarousel.data} missionLine={MissionLine}/>
//         {/* Enhanced Show in Map Button - Responsive */}
//         <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
//           <Link href="https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5925548,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d13a793489:0xe5f93f75c0c87a66!8m2!3d12.961518!4d77.5951297!16s%2Fg%2F1tdxj98p?entry=ttu&g_ep=EgoyMDI1MDEyOS4xIKXMDSoASAFQAw%3D%3D" target="_blank">
//             <div className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2  no-underline sm:px-5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center space-x-1.5 sm:space-x-2.5 min-w-[120px] sm:min-w-[160px]">
//               <div className="bg-white/20 p-1 sm:p-1.5 rounded-full  group-hover:bg-white/30 transition-colors duration-300">
//                 <FontAwesomeIcon 
//                   icon={faLocation} 
//                   className="text-white text-sm sm:text-base group-hover:animate-pulse"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-semibold no-underline text-xs sm:text-sm uppercase tracking-wide">
//                   Find Us
//                 </span>
//                 <span className="text-xs  opacity-90 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
//                   View on Map
//                 </span>
//               </div>
//               <div className="ml-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
//                 <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             </div>
//           </Link>
//         </div>
              
        
//         <Mission missionLine ={description}/>
       
//         <Divider/>
        
//         {/* <AboutContainer />
//         <br></br>
//         <Divider/>
//         <br></br> */}
        
//           <div className="flex justify-center px-4 sm:px-6 lg:px-8">
    
             
//               <CarouselNew BlogPosts={strapiBlogData.data}/>
              
     
//         </div> 

//         {/*<Divider/><br></br>
//         <div className="self-stretch h-[704px] flex flex-col items-center justify-center py-20 px-20 box-border text-21xl font-dm-serif-display mdN">
//           <div className="flex-1 flex flex-dir1 items-center justify-start gap-[40px]">
//             <div className="w-48 flex flex-dir1 items-center justify-start py-2 pr-2 pl-0 box-border text-lg font-dm-sans">
//               <div className="w-[173px] relative inline-block h-[29px] shrink-0">
//                 Practice Areas
//               </div>
//             </div>
//             <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
//               <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
//               <div className="w-[540px] relative inline-block">Heading 1</div>
//               <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 enim ad minim veniam, quis nostrud exercitation ullamco laboris
//                 nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
//                 in reprehenderit in voluptate velit esse cillum dolore eu fugiat
//                 nulla pariatur.
//               </div>
//             </div>
//             <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
//               <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
//               <div className="w-[540px] relative inline-block">Heading 2</div>
//               <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. `}</div>
//             </div>
//           </div>
//         </div>
//         <Divider/>
//         <div className="self-stretch h-[704px] flex flex-col items-center justify-center py-20 px-20 box-border text-21xl font-dm-serif-display mdN">
//           <div className="flex-1 flex flex-dir1 items-center justify-start gap-[40px]">
//             <div className="w-48 flex flex-dir1 items-center justify-start py-2 pr-2 pl-0 box-border text-lg font-dm-sans">
//               <div className="w-[173px] relative inline-block h-[29px] shrink-0">
//                 Client Testimonials
//               </div>
//             </div>
//               <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
//               <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
//               <div className="w-[540px] relative inline-block">Heading 1</div>
//               <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 enim ad minim veniam, quis nostrud exercitation ullamco laboris
//                 nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
//                 in reprehenderit in voluptate velit esse cillum dolore eu fugiat
//                 nulla pariatur.
//               </div>
//             </div>
//             <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
//               <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
//               <div className="w-[540px] relative inline-block">Heading 2</div>
//               <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. `}</div>
//             </div>

//             </div>
           
//           </div> */}
          
//         <Footer/>
//         </>
//   );
// };

// export default Home;

import type { NextPage } from "next";
import Nav from "../components/nav";
import AboutContainer from "../components/about-container";
import Blogs from "../components/blogs";
import Mission from "@/components/mission";
import Divider from "@/components/divider";
import Footer from "@/components/Footer/Footer";
import DisclaimerModal from "@/components/Disclaimer";
import PracticeCarousel from "@/components/PracticeCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CarouselNew from "@/components/CarouselNew";

// ✅ Improved fetch wrapper
async function getStrapiData(url: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + url, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Strapi fetch error:", error);
    return null;
  }
}

const Home: NextPage = async () => {
  const baseURL = "http://localhost:1337";

  // ✅ Fetch data
  const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
  const strapiBlogData = await getStrapiData("/api/posts?populate=*");
  const strapiBlogData1 = await getStrapiData("/api/posts/1?populate=*");
  const strapiBlogData2 = await getStrapiData("/api/posts/2?populate=*");

  // ✅ Handle both single type & collection type
  const homeAttributes =
    strapiHomeData?.data?.attributes || strapiHomeData?.data?.[0]?.attributes;

  if (!homeAttributes) {
    return <div>Error: Home page data not found from Strapi</div>;
  }

  const {
    Title,
    description,
    MissionLine,
    Disclaimer,
    HomePageCarousel,
    Logo,
  } = homeAttributes;

  // ✅ Blog data safe check
  const blog2Attributes = strapiBlogData2?.data?.attributes;
  const imageUrl = blog2Attributes?.cover?.data?.attributes?.url
    ? baseURL + blog2Attributes.cover.data.attributes.url
    : "";

  // ✅ Safe Logo URL
  const logoURL = Logo?.data?.attributes?.url
    ? baseURL + Logo.data.attributes.url
    : "";

  return (
    <>
      <DisclaimerModal disclaimer={Disclaimer} />
      <Nav logoURL={logoURL} />

      <PracticeCarousel
        HomePageCarousel={HomePageCarousel?.data || []}
        missionLine={MissionLine}
      />

      {/* Enhanced Show in Map Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
        <Link
          href="https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5925548,17z"
          target="_blank"
        >
          <div className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2  no-underline sm:px-5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer flex items-center space-x-1.5 sm:space-x-2.5 min-w-[120px] sm:min-w-[160px]">
            <div className="bg-white/20 p-1 sm:p-1.5 rounded-full  group-hover:bg-white/30 transition-colors duration-300">
              <FontAwesomeIcon
                icon={faLocation}
                className="text-white text-sm sm:text-base group-hover:animate-pulse"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold no-underline text-xs sm:text-sm uppercase tracking-wide">
                Find Us
              </span>
              <span className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                View on Map
              </span>
            </div>
            <div className="ml-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      <Mission missionLine={description} />

      <Divider />

      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        {strapiBlogData?.data ? (
          <CarouselNew BlogPosts={strapiBlogData.data} />
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;

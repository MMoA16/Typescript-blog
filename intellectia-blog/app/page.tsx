import type { NextPage } from "next";
import Nav from "../components/nav";
import AboutContainer from "../components/about-container";
import Blogs from "../components/blogs";
import Mission from "@/components/mission";
import Divider from "@/components/divider";
import Footer from "@/components/Footer/Footer";
import DisclaimerModal from "@/components/Disclaimer";
import PracticeCarousel from "@/components/PracticeCarousel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { Key } from "react";
import Link from "next/link";
import CardNew from "@/components/CardNew";
import CarouselNew from "@/components/CarouselNew";
import CollapsibleDropdown from "@/components/CollpasibleDropdown";

async function getStrapiData(url:string){
  const baseURL="http://localhost:1337";
  try{
    const response = await fetch(baseURL + url,{cache:'no-cache'});
    const data= await response.json();
    return data;
  }catch(error){
    console.error(error);
  }
}
const Home: NextPage = async() => {
  const baseURL = "http://localhost:1337";
  const strapiData = await getStrapiData("/api/home-page?populate=*");
  const strapiBlogData = await getStrapiData("/api/posts?populate=*");
  const strapiBlogData1 = await getStrapiData("/api/posts/1?populate=*");
  const strapiBlogData2 = await getStrapiData("/api/posts/2?populate=*");
  const {Title,description, MissionLine, Disclaimer, HomePageCarousel,Logo} = strapiData.data.attributes;
  const imageUrl = baseURL + strapiBlogData2.data.attributes.cover.data.attributes.url;
  const logoURL=baseURL+Logo.data.attributes.url;
  //console.log(strapiBlogData1.data.attributes)
  return (
    
     // {/* <div className="w-[1512px] hidden flex-col items-start justify-start"> */}
       // {/* /*<div className="self-stretch flex flex-row items-center justify-between py-10 px-20"> */}
          /* <div className="w-[821px] flex flex-col items-start justify-start p-2.5 box-border">
            <div className="self-stretch flex flex-row items-start justify-start gap-[40px]">
              <div className="flex-1 relative font-dm-serif-display">
                WeclerMcgill
              </div>
              <div className="flex-1 relative">Home</div>
              <div className="flex-1 relative">About</div>
              <div className="flex-1 relative">Case Studies</div>
              <div className="flex-1 relative">Practice Areas</div>
            </div>
          </div>  */
          /* <div className="flex flex-row items-center justify-between">
            <div className="relative">+8197482349</div>
            <div className="w-[199px] relative bg-gray-200 h-[47px] text-center text-lg text-gray-100">
              <div className="absolute top-[12px] left-[24px] font-medium">
                Free Consultation
              </div>
            </div>
          </div> */
        /* </div>  */
        /* <div className="self-stretch h-[704px] flex flex-row items-center justify-center py-10 px-20 box-border text-lg">
          <div className="flex-1 flex flex-row items-center justify-start gap-[40px]">
            <div className="flex-1 flex flex-row items-center justify-start p-2">
              <div className="w-[100px] relative inline-block h-[23px] shrink-0">
                Our Mission
              </div>
            </div>
            <div className="flex-1 flex flex-row items-center justify-start text-109xl font-dm-serif-display">
              <div className="flex-1 relative leading-[128px]">
                We are the last line of defence for the little guy
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start py-0 px-20">
          <div className="flex-1 bg-black h-px" />
        </div>
      </div> */
      
<>

        <DisclaimerModal disclaimer={Disclaimer}/>
        <Nav logoURL={logoURL}/>
        
        <PracticeCarousel HomePageCarousel={HomePageCarousel.data} missionLine={MissionLine}/>
        <Link href="https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5925548,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d13a793489:0xe5f93f75c0c87a66!8m2!3d12.961518!4d77.5951297!16s%2Fg%2F1tdxj98p?entry=ttu&g_ep=EgoyMDI1MDEyOS4xIKXMDSoASAFQAw%3D%3D" target="_blank">

        <div className="font-semibold text-gray-30 rounded-md ShowInMaps">
          Show In Map
      
          <FontAwesomeIcon icon={faLocation} className="fa-solid fa-location-crosshairs fa-2x locIcn">
            
          </FontAwesomeIcon>
          </div>
        
              </Link>
              
        
        <Mission missionLine ={description}/>
       
        <Divider/>
        
        {/* <AboutContainer />
        <br></br>
        <Divider/>
        <br></br> */}
        
          <div className="flex justify-center">
    
             
              <CarouselNew BlogPosts={strapiBlogData.data}/>
              
     
        </div> 

        {/*<Divider/><br></br>
        <div className="self-stretch h-[704px] flex flex-col items-center justify-center py-20 px-20 box-border text-21xl font-dm-serif-display mdN">
          <div className="flex-1 flex flex-dir1 items-center justify-start gap-[40px]">
            <div className="w-48 flex flex-dir1 items-center justify-start py-2 pr-2 pl-0 box-border text-lg font-dm-sans">
              <div className="w-[173px] relative inline-block h-[29px] shrink-0">
                Practice Areas
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
              <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
              <div className="w-[540px] relative inline-block">Heading 1</div>
              <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
              <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
              <div className="w-[540px] relative inline-block">Heading 2</div>
              <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. `}</div>
            </div>
          </div>
        </div>
        <Divider/>
        <div className="self-stretch h-[704px] flex flex-col items-center justify-center py-20 px-20 box-border text-21xl font-dm-serif-display mdN">
          <div className="flex-1 flex flex-dir1 items-center justify-start gap-[40px]">
            <div className="w-48 flex flex-dir1 items-center justify-start py-2 pr-2 pl-0 box-border text-lg font-dm-sans">
              <div className="w-[173px] relative inline-block h-[29px] shrink-0">
                Client Testimonials
              </div>
            </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
              <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
              <div className="w-[540px] relative inline-block">Heading 1</div>
              <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
              <div className="self-stretch relative bg-gainsboro h-72 overflow-hidden shrink-0" />
              <div className="w-[540px] relative inline-block">Heading 2</div>
              <div className="w-[540px] relative text-lg leading-[32px] font-dm-sans inline-block">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. `}</div>
            </div>

            </div>
           
          </div> */}
          
        <Footer/>
        </>
  );
};

export default Home;

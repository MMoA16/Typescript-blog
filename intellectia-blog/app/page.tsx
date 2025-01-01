import type { NextPage } from "next";
import Nav from "../components/nav";
import AboutContainer from "../components/about-container";
import Blogs from "../components/blogs";
import Mission from "@/components/mission";
import Divider from "@/components/divider";
import Footer from "@/components/Footer/Footer";

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
  const strapiData = await getStrapiData("/api/home-page");
  const strapiBlogData1 = await getStrapiData("/api/posts/1?populate=*");
  const strapiBlogData2 = await getStrapiData("/api/posts/2?populate=*");
  const {Title, MissionLine} = strapiData.data.attributes;
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
        <Nav title= {Title} />
        <Divider/>
        <Mission missionLine ={MissionLine}/>
        <Divider/>
        <AboutContainer />
        <br></br>
        <Divider/>
        <br></br>
        <div className="container grid grid-cols-2 gap-0 flex flex-col mdN items-start py-20 px-20 gap-[40px]">
          <div className="w-[100px] container flex flex-dir1 items-center gap-[40px] text-gray-300">
            <div className="flex flex-dir1 items-center justify-start pl-0 box-border mdN text-lg font-dm-sans">
              <div className="w-[100px] items-center relative inline-block h-[29px] shrink-0">
                Resources
              </div>
            </div>
            
          <br></br>
          <Blogs  BlogData = {strapiBlogData2.data}/>
          
          <Blogs  BlogData = {strapiBlogData2.data}/>
          </div>
        </div>
        <br></br>
        <br></br>
        <Divider/><br></br>
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
            {/* <div className="self-stretch flex flex-row items-center justify-start py-0 pr-20 pl-0">
              <div className="flex-1 bg-black h-px" />
            </div> */}
          </div>
        <Footer/>
        </>
  );
};

export default Home;

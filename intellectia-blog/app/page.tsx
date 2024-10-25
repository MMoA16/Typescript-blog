import type { NextPage } from "next";
import Nav from "../components/nav";
import AboutContainer from "../components/about-container";
import Blogs from "../components/blogs";
import Mission from "@/components/mission";
import Divider from "@/components/divider";

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
      
      <div className="self-stretch flex flex-col items-start justify-start">
        <Nav title= {Title} />
        <Divider/>
        <Mission missionLine ={MissionLine}/>
        <Divider/>
        <AboutContainer />
        <Divider/>
        <div className="w-[1512px] flex flex-col items-start justify-start py-[60px] px-20 box-border gap-[40px]">
          <div className="self-stretch flex flex-row items-center justify-start gap-[40px] text-gray-300">
            <div className="w-48 flex flex-row items-center justify-start py-2 pr-2 pl-0 box-border">
              <div className="w-[173px] relative inline-block h-[29px] shrink-0">
                Resources
              </div>
            </div>
            <Blogs BlogData = {strapiBlogData1.data}/>
            <Blogs BlogData = {strapiBlogData2.data}/>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[40px] py-[60px] tx-40 text-gray-300">
            <Blogs BlogData = {strapiBlogData1.data}/>
            <Blogs BlogData = {strapiBlogData2.data} />
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start py-0 px-20">
          <div className="flex-1 bg-black h-px" />
        </div>
        <div className="self-stretch h-[704px] flex flex-row items-center justify-center py-10 px-20 box-border text-21xl font-dm-serif-display">
          <div className="flex-1 flex flex-row items-center justify-start gap-[40px]">
            <div className="w-48 flex flex-row items-center justify-start py-2 pr-2 pl-0 box-border text-lg font-dm-sans">
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
        <div className="self-stretch flex flex-row items-center justify-start py-0 px-20">
          <div className="flex-1 bg-black h-px" />
        </div>
        <div className="w-[1512px] flex flex-row items-center justify-start py-10 px-20 box-border text-base">
          <div className="flex-1 flex flex-col items-start justify-center gap-[40px]">
            <div className="self-stretch flex flex-row items-center justify-start gap-[40px]">
              <div className="flex-1 flex flex-col items-start justify-center py-2 pr-2 pl-0 text-lg text-gray-300">
                <div className="w-[173px] relative inline-block h-[29px] shrink-0">
                  Expertise
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
                <div className="self-stretch relative leading-[16px]">
                  Heading
                </div>
                <div className="self-stretch relative text-lg leading-[16px]">
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 1
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 2
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 3
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 4
                  </p>
                  <p className="m-0">Footer link 5</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
                <div className="self-stretch relative leading-[16px]">
                  Heading
                </div>
                <div className="self-stretch relative text-lg leading-[16px]">
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 1
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 2
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 3
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 4
                  </p>
                  <p className="m-0">Footer link 5</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
                <div className="self-stretch relative leading-[16px]">
                  Heading
                </div>
                <div className="self-stretch relative text-lg leading-[16px]">
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 1
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 2
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 3
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Footer link 4
                  </p>
                  <p className="m-0">Footer link 5</p>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start py-0 pr-20 pl-0">
              <div className="flex-1 bg-black h-px" />
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[40px] text-lg">
              <div className="flex-1 h-[72px] flex flex-col items-start justify-center py-2 pr-2 pl-0 box-border">
                <div className="w-[173px] relative inline-block h-[29px] shrink-0">
                  Copyrights 2023 All rights reserved
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[24px]">
                <div className="self-stretch relative leading-[16px]">
                  Twitter
                </div>
                <div className="self-stretch relative leading-[16px]">
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Facebook
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Twitter
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Youtube
                  </p>
                  <p className="[margin-block-start:0] [margin-block-end:32px]">
                    Instagram
                  </p>
                  <p className="m-0">LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Home;

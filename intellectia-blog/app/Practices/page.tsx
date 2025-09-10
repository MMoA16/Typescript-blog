
import CardNew from "@/components/CardNew";
import CardNewPracticeArea from "@/components/CardNewPracticeArea";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/nav";

import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";

export type PracticeContainerType = {
    className?: string;
  
  };

    async function getStrapiData(url: string) {
        const baseURL = "http://localhost:1337";
        try {
          const response = await fetch(baseURL + url, { cache: 'no-cache' });
          const data = await response.json();
          console.log(data)
      
          return data;
        } catch (error) {
          console.error(error);
        }
      }
const Practice: NextPage<PracticeContainerType> = async () => {
    const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
  const strapipracticearea = await getStrapiData("/api/practice-areas?populate=*");
  const strapiFAQs = await getStrapiData("/api/faqs?populate=*");
  //const {strapiAboutUs}= await getStrapiData("/api/about-us");
  console.log("hujioj",strapiFAQs.data );
  const { Title, MissionLine, desc,Logo} = strapiHomeData.data.attributes;
  const logoURL="http://localhost:1337"+Logo.data.attributes.url

    return (  
        <>
        <Nav  logoURL={logoURL} />
        <div className="flex flex-wrap justify-center gap-[20px] p-4 px-20" >
        {/* <div className="container flex flex-wrap justify-center gap-[20px] p-4 px-20" > */}
        {strapipracticearea?.data?.map((teamMember: any) => (
        
          <CardNewPracticeArea key={teamMember.id} BlogPosts={teamMember} />
     
        
          ))}
          </div>
          <div className="px-50">
          <div className="max-w-2xl mx-auto px-50 faqcss dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-white li-bulletremove">FAQs</h1>
          <FAQs faqs={strapiFAQs.data}/>
    </div>
    </div>
    <Footer />
 
          </>
          
    );
}

export default Practice;
import Nav from "@/components/nav";
import type { NextPage } from "next";
import { title } from "process";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import Head from 'next/head'
import Link from "next/link";
import Vision from "@/components/Vision";
import Mission from "@/components/mission";
import { Divide } from "lucide-react";
import Divider from "@/components/divider";
import Card from "@/components/Card";
import Footer from "@/components/Footer/Footer";
import TeamList from "@/components/TeamList";

interface ImageProps {
  id: number
}
export type AboutContainerType = {
  className?: string;

};
async function getStrapiData(url: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + url, { cache: 'no-cache' });
    const data = await response.json();
    //console.log(data)

    return data;
  } catch (error) {
    console.error(error);
  }
}
const AboutUs: NextPage<AboutContainerType> = async () => {
  
  const images = [
    "/frame-15@2x.png",
    "/frame-14@2x.png"
  ]
  // console.log("hujioj");
  const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
  const strapiAboutData = await getStrapiData("/api/teams?populate=*");
  const TeamData = await getStrapiData("/api/team-members?populate=*");

  //const {strapiAboutUs}= await getStrapiData("/api/about-us");
  //console.log("hujioj",strapiAboutUs.data.attributes);
  const { Title, MissionLine, desc, Logo, Values} = strapiHomeData.data.attributes;
  const logoURL="http://localhost:1337"+Logo.data.attributes.url
  /*const teamMember = {
    name: 'John Doe',
    photo: '/frame-16@2x.png', // Make sure to use a valid image path
    designation: 'Senior Developer',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
};*/
  //const { AboutUs } = strapiAboutUs.data.attributes;
  console.log(strapiAboutData)
  return (
  //  <Head>
  //   <title>About us | Bodhankar & Associates</title>
  //   <meta
  //     name="viewport"
  //     content="minimum-scale=1, initial-scale=1, width=device-width"
  //   />
  // </Head>
  <>
  <Nav logoURL={logoURL} />
  
  {/* <Divider/> */}
  {/* <div className="md:w-full"> */}
    <div className="dark:bg-gray-800 flex flex-col lg:flex-row py-8 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-20 mdAboutUsBack">
      <div className="flex items-center justify-center w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 mb-6 lg:mb-0 lg:pr-8">
        <img
          className="object-cover w-full h-full max-w-2xl rounded-lg shadow-lg mdAboutUs"
          src="/images/why-us.jpeg"
          alt="Intellectia"
        />
      </div>
      <div className="w-full lg:w-1/2 lg:pl-8">
        <div className="max-w-lg mx-auto lg:mx-0 mt-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-dm-sans text-center lg:text-left">
            Who We{' '}
            <span className="text-indigo-400 font-dm-sans">Are</span>
          </h2>
          <pre className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify whitespace-pre-wrap">
            {desc}
          </pre>
        

          <div className="mt-6 text-center lg:text-left">
          
            <Link href="/ContactUs" className="li-a" legacyBehavior passHref>
            
              <button className="font-semibold text-gray-300 transition-colors duration-200 transform GetInTouch cursor-pointer rounded-md hover:bg-gray-700 bg-gray-800 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  {/* </div> */}
  <Vision />
  {/* <Divider/> */}
   

            <div className="mt-4 mb-4">
                <div className="w-full h-px sm:h-0.5 bg-black" />
              </div>

  
  {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-8 sm:py-10 lg:py-16"> */}
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-8 sm:py-10 lg:py-16">
   
  
  <div className='bg-white text-center'>
  <h2 className="text-5xl px-6 dark:text-black font-dm-sans md:text-20xl">
            Our Values   
      </h2>
    <div className='max-w-4xl mx-auto text-center  px-6 md:px-6 mdN'>
      <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
        Driven by hunger for intellectual stimulation, we are constantly involved in researching ideas, conducting qualitative and quantitative analysis and applying complex frameworks to solve knotty problems. Our primary goal is to help people and their businesses. We built trust because of our will to help our clients accomplish their goals. Our role is to assist organization in critical areas of their inclusiveness work. We act as an educator, a catalyst for deeper change, a resource or a facilitator, the leadership of the process remains within your organization. We act as an extension of in-house legal cell or as independent legal consultants. Our efforts are towards being strategic partners for our clients growth and not just be a consulting firm.
          </p>

      <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
        Our Associates have a successful track record of representing companies and individuals before domestic courts and arbitration tribunals. Although, our Associates have been collaborating on various matters since a fairly long time, the firm was formed recently in order to serve a larger platform for new clients and associates.

          </p>
      <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
        We focus on addressing industry wise Management & Legal Consultancy services. Our priority is to safeguard our client's interests and ensure that personal or professional association of any Associate does not involve a conflict of interest.
          </p>
      <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
        We are a socially responsible firm and undertake pro-bono work to support several philanthropic organizations, NGOs and government initiatives related to social justice, child-care and education.
          </p>
    </div>
  </div>
</div>
{/* <Divider/> */}
  
  {/* <div className="px-20 py-10 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
  <div className='bg-white'>
  <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 dark:text-text-black px-4 sm:px-6 font-dm-sans text-center lg:text-left mb-6 sm:mb-8">
            Our Team
          </h2>
  <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mdN">
  {strapiAboutData?.data?.map((teamMember: any) => (

  <Card key={teamMember.id} teamMember={teamMember} />

  ))}
  </div>
  </div>
  </div> */}
  
   <div className="bg-gray-100 px-20 py-10 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
         <div className=" text-center">
           <h2 className="text-5xl  text-gray-800 dark:text-text-black px-6 font-dm-sans md:text-21xl">
             Our Team
           </h2>
           <TeamList teamMembers={TeamData?.data || []} /> 
         </div>
       </div>

  <Footer/>
</>
  );
};

export default AboutUs;



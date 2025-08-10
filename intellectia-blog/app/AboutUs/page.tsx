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
  console.log("hujioj");
  const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
  const strapiAboutData = await getStrapiData("/api/teams?populate=*");
  const TeamData = await getStrapiData("/api/team-members?populate=*");

  //const {strapiAboutUs}= await getStrapiData("/api/about-us");
  //console.log("hujioj",strapiAboutUs.data.attributes);
  const { Title, MissionLine, desc, Logo} = strapiHomeData.data.attributes;
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
    <div className="dark:bg-gray-800 flex flex-row flex-wrapAb py-10 md:w-full md:h-50 md:py-16 md:flex-row md:items-center mdAboutUsBack">
      <div className="flex items-center justify-start w-1/2 h-96 px-20 md:w-full">
        <img
          className="object-cover w-full h-full max-w-2xl mdAboutUs"
          src="/images/why-us.jpeg"
          alt="Intellectia"
        />
      </div>
      <div className="w-1/2 px-20 py-2 mdAboutUs">
        <div className="max-w-lg">
          <h2 className="text-3xl text-white font-dm-sans md:text-3xl">
            Who We{' '}
            <span className="text-indigo-400 font-dm-sans">Are</span>
          </h2>
          <pre className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
            {desc}
          </pre>
        

          <div className="mt-6">
          
            <Link href="/contact" className="li-a" legacyBehavior passHref>
            
              <button className="font-semibold text-gray-300 transition-colors duration-200 transform GetInTouch rounded-md hover:bg-gray-700 bg-gray-800">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  {/* </div> */}
  <Vision />
  <Divider/>
  <div className="container flex flex-row px-20 py-10 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">

  
  <div className='bg-white text-center'>
  <h2 className="text-3xl px-6 dark:text-black font-dm-sans md:text-3xl">
            Our Values   
      </h2>
    <div className='max-w-4xl mx-auto px-6 mdN'>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
        Driven by hunger for intellectual stimulation, we are constantly involved in researching ideas, conducting qualitative and quantitative analysis and applying complex frameworks to solve knotty problems. Our primary goal is to help people and their businesses. We built trust because of our will to help our clients accomplish their goals. Our role is to assist organization in critical areas of their inclusiveness work. We act as an educator, a catalyst for deeper change, a resource or a facilitator, the leadership of the process remains within your organization. We act as an extension of in-house legal cell or as independent legal consultants. Our efforts are towards being strategic partners for our clients growth and not just be a consulting firm.
          </p>

      <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
        Our Associates have a successful track record of representing companies and individuals before domestic courts and arbitration tribunals. Although, our Associates have been collaborating on various matters since a fairly long time, the firm was formed recently in order to serve a larger platform for new clients and associates.

          </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
        We focus on addressing industry wise Management & Legal Consultancy services. Our priority is to safeguard our client’s interests and ensure that personal or professional association of any Associate does not involve a conflict of interest.
          </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
        We are a socially responsible firm and undertake pro-bono work to support several philanthropic organizations, NGOs and government initiatives related to social justice, child-care and education.
          </p>
    </div>
  </div>
</div>
<Divider/>
  
  {/* <div className="px-20 py-10 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
  <div className='bg-white'>
  <h2 className="text-3xl text-gray-800 dark:text-text-black px-6 font-dm-sans md:text-3xl">
            Our Team
          </h2>
  <div className="container flex flex-row flex-wrap mdN">
  {strapiAboutData?.data?.map((teamMember: any) => (

  <Card key={teamMember.id} teamMember={teamMember} />

  ))}
  </div>
  </div>
  </div> */}
  
  <div className="px-20 py-10 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
        <div className="bg-white">
          <h2 className="text-3xl text-center text-gray-800 dark:text-text-black px-6 font-dm-sans md:text-21xl">
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
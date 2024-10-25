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
  const strapiHomeData = await getStrapiData("/api/home-page");
  const strapiAboutData = await getStrapiData("/api/teams?populate=*");
  //const {strapiAboutUs}= await getStrapiData("/api/about-us");
  //console.log("hujioj",strapiAboutUs.data.attributes);
  const { Title, MissionLine, description} = strapiHomeData.data.attributes;
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
  <Nav title={Title} />
  {/* <Divider/> */}
  {/* <div className="md:w-full"> */}
    <div className="container dark:bg-gray-800 flex flex-row px-20 py-10 mx-auto md:w-full md:h-50 md:py-16 md:flex-row md:items-center">
      <div className="flex items-center justify-start w-1/2 h-96 md:w-full">
        <img
          className="object-cover w-full h-full max-w-2xl md:h-full"
          src="/images/why-us.jpeg"
          alt="Intellectia"
        />
      </div>
      <div className="w-1/2 px-20 py-2 md:full">
        <div className="max-w-lg">
          <h2 className="text-3xl text-white font-dm-sans md:text-3xl">
            Who We{' '}
            <span className="text-indigo-400 font-dm-sans">Are</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
            {description}
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
            The firm advises on specific queries and documentation with respect to human resource, labour, organization development, HR strategies, statutory acts, government schemes, student counseling programs and career guidance. The firm provides paralegal support services to various types of businesses.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
            The firm adheres to ethical professional standards in view of its multi-dimensional approach towards sustaining ethics & morality in business, work and life. The firm is registered under MSME Act, 2006 and is affiliated to several academic forums and socio-legal associations.
          </p>

          <div className="mt-8">
  
            <Link href="/contact" className="li-a" legacyBehavior passHref>
              <a className="px-6 py-2 font-semibold text-gray-300 transition-colors duration-200 transform  rounded-md hover:bg-gray-700 bg-gray-800">
                Get In Touch
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  {/* </div> */}
  <Vision />
  <Divider/>
  <div className="container flex flex-row px-20 py-10 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">

  
  <div className='bg-white'>
  <h2 className="text-3xl px-6 dark:text-black font-dm-sans md:text-3xl">
            Our Values   
      </h2>
    <div className='max-w-4xl mx-auto px-6 md:px-0 py-1'>
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
  
  <div className="px-20 py-10 mx-auto space-y-6 md:h-128 md:py-16 md:flex-row md:items-center md:space-x-6">
  <div className='bg-white'>
  <h2 className="text-3xl text-gray-800 dark:text-text-black px-6 font-dm-sans md:text-3xl">
            Our Team
          </h2>
  <div className="container flex flex-row flex-wrap">
  {strapiAboutData?.data?.map((teamMember: any) => (
    <div className="container flex flex-row flex-wrap" key={teamMember.id}>
  <Card teamMember={teamMember} />
  </div>
  ))}
  </div>
  </div>
  </div>
  <Footer/>
</>
  );
};

export default AboutUs;

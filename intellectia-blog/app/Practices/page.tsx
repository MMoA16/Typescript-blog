import CardNew from "@/components/CardNew";
import CardNewPracticeArea from "@/components/CardNewPracticeArea";
import Nav from "@/components/nav";
import { Card } from "@material-ui/core";
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
    const strapiHomeData = await getStrapiData("/api/home-page");
  const strapipracticearea = await getStrapiData("/api/practice-areas?populate=*");
  //const {strapiAboutUs}= await getStrapiData("/api/about-us");
  console.log("hujioj",strapipracticearea );
  const { Title, MissionLine, desc} = strapiHomeData.data.attributes;
    return (  
        <>
        <Nav title={Title} />
        <div className="container flex flex-wrap justify-center gap-6 p-4" >
        {strapipracticearea?.data?.map((teamMember: any) => (
        
          <CardNewPracticeArea key={teamMember.id} BlogPosts={teamMember} />
     
        
          ))}
          </div>
          </>
          
    );
}

export default Practice;
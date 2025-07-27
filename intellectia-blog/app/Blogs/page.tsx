
import BlogFrontend from "@/components/BlogFrontend";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/nav";
import type { NextPage } from "next";
export type BlogsType = {
  className?: string;
};
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
 

const Blogs: NextPage<BlogsType> = async ({ className = "" }) => {
  const strapiData = await getStrapiData("/api/home-page?populate=*");
  const strapiBlogData = await getStrapiData("/api/posts?populate=*");
  const {Title, MissionLine,Logo} = strapiData.data.attributes;
  const logoURL="http://localhost:1337"+Logo.data.attributes.url
  console.log(strapiBlogData.data.attributes)
  return (
    <>
    <Nav logoURL={logoURL}/>
    <br></br>
    <br></br>
    <BlogFrontend strapiBlogData={strapiBlogData}></BlogFrontend>
    <br></br>
    <br></br>
    <Footer/>
    </>
  );
};

export default Blogs;

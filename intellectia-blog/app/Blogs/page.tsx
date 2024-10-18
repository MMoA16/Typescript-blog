import BlogCard from "@/components/BlogCard";
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
  const strapiData = await getStrapiData("/api/home-page");
  const strapiBlogData = await getStrapiData("/api/posts?populate=*");
  const {Title, MissionLine} = strapiData.data.attributes;
  console.log(strapiBlogData.data.attributes)
  return (
    <>
    <Nav title={Title}/>
    <div className="self-stretch flex flex-row items-center justify-start gap-[40px] py-[60px] tx-40 text-gray-300">
    {strapiBlogData?.data?.map((category: any) => (
        <div key={category.id}>
          <BlogCard BlogData={category} />
        </div>
      ))}
      </div>
    </>
  );
};

export default Blogs;
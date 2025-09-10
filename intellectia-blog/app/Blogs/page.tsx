
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
    
    {/* Page Header */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8"> */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Resources & <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest legal insights, industry updates, and expert analysis
          </p>
        </div>
      </div>
    </div>
    
    <BlogFrontend strapiBlogData={strapiBlogData}></BlogFrontend>
    
    <Footer/>
    </>
  );
};

export default Blogs;

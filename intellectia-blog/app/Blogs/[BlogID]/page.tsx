import Nav from "@/components/nav";
import Link from "next/link";
import React from "react";
import Image from "next/image";

async function fetchBlog(id : number){
    const baseURL=`http://localhost:1337/api/posts/${id}?populate=*`;
    try{
      const response = await fetch(baseURL ,{cache:'no-cache'});
      const data= await response.json();
      return data;
    }catch(error){
      console.error(error);
    }
  }
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

const page = async ({params}: any) =>{
    const strapiData = await getStrapiData("/api/home-page");
    console.log(params)
    const blog=await fetchBlog(params.BlogID);
    const {Title, MissionLine} = strapiData.data.attributes;
    const imageUrl = "http://localhost:1337" + blog.data.attributes.cover.data.attributes.url;
    console.log(blog)
    return (
        <><Link href="/">{"< Back"}</Link><div className="self-stretch flex flex-col items-start justify-start text-lg">
            <Nav title={Title} />
            <h1 className="text-3xl font-semibold px-20">{blog.data.attributes.title}</h1>
            <div className="max-w-3xl mx-auto p-4">

                <div className="relative w-full h-96 overflow-hidden rounded-lg mt-5 px-20">
                    <Image objectFit="cover" src={imageUrl} alt={""} width={600} height={400} />
                </div>
                <div className="mt-4">
                    
                    <p className="text-gray-600 mt-2 px-20">{blog.data.attributes.ShortDesc}</p>
                    <div className="mt-4 flex items-center text-gray-400 px-20">
                        <span className="text-sm">
                            Published on{" "}
                            {"23-23-2342"}
                        </span>
                    </div>
                </div>
            </div>
        </div></>)

}
export default page;
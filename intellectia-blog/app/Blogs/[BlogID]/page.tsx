
import Nav from "@/components/nav";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/Footer";
import BlogContent from "@/components/BlogContent";

async function fetchBlog(id: number) {
  const baseURL = `http://localhost:1337/api/posts/${id}?populate=*`;
  const response = await fetch(baseURL, { cache: "no-cache" });
  return await response.json();
}

async function getStrapiData(url: string) {
  const baseURL = "http://localhost:1337";
  const response = await fetch(baseURL + url, { cache: "no-cache" });
  return await response.json();
}



const Page = async ({ params }: any) => {
  const strapiData = await getStrapiData("/api/home-page");
  const blog = await fetchBlog(params.BlogID);
  const { Title } = strapiData.data.attributes;
  const { title, content, cover } = blog.data.attributes;
  const imageUrl = "http://localhost:1337" + cover?.data?.attributes?.url;

  return (
    <>
      <Nav title={Title} />
      <br></br>
      <BlogContent strapiData={strapiData} blog={blog}/>
      <Footer/>
    </>
  );
};

export default Page;

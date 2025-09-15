'use client';

import Nav from "@/components/nav";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer/Footer";


const styles = {
  container: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
  title: "text-4xl md:text-5xl font-dm-serif-display font-bold text-center text-gray-900 mb-8 leading-tight",
  meta: "max-w-3xl mx-auto px-4 text-left text-gray-500 text-sm mb-12",
  content: "max-w-3xl mx-auto px-4 text-gray-800",
  paragraph: "text-lg leading-relaxed mb-6 text-gray-700",
  imageContainer: "my-12 w-full flex justify-center",
  imageWrapper: "w-full max-w-[800px] rounded-xl overflow-hidden shadow-lg",
  image: "rounded-xl shadow-md object-cover w-full h-auto transition-transform duration-300 hover:scale-[1.02]",
  link: "text-blue-600 underline hover:text-blue-800 transition-colors",
};


const RenderContent = (content: any[]) => {
  return content.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <motion.div
          key={`block-${i}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="text-lg text-gray-700 leading-8 mb-6 max-w-3xl mx-auto px-4"
        >
          {block.children.map((child: any, j: number) => {
            if (child.type === "text") {
              return (
                <span className="blog-content" key={`text-${i}-${j}`}>
                  {child.text}
                </span>
              );
            }

            if (child.type === "link") {
              return (
                <a
                  key={`link-${i}-${j}`}
                  href={child.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors blog-content"
                >
                  {child.children?.[0]?.text || "Link"}
                </a>
              );
            }

            return null;
          })}
        </motion.div>
      );
    }

    if (block.type === "image") {
      const { url, width, height } = block.image;
      return (
        <motion.div
          key={`image-${i}`}
          className="my-10 w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="blog-image-container">
            <div className="blog-image-wrapper">
              <Image
                src={url}
                alt={block.name || "Image"}
                width={600}
                height={400}
                className="blog-image"
                priority
              />
            </div>
          </div>
        </motion.div>
      );
    }

    return null;
  });
};
const Page = async ({ strapiData, blog }: any) => {
  
  const { Title } = strapiData.data.attributes;
  const { title, content, cover } = blog.data.attributes;
  const imageUrl = "http://localhost:1337" + cover?.data?.attributes?.url;

  return (
    <>
     
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="blog-content">
          {title}
        </h1>
        <br></br>
        <br></br>
        <div className="blog-meta">
          Published on <strong>23-23-2342</strong>
        </div>
        <div className="blog-image-container">
  <div className="blog-image-wrapper">
        {imageUrl && (
          <div className="flex justify-center my-8">
         
            <Image
              src={imageUrl}
              alt=""
              width={600}
              height={400}
              className="blog-image"
              priority
            />
           
            </div>

        )}
 </div>
 </div>
        <div className="prose prose-lg text-gray-800 max-w-3xl mx-auto px-6 font-dm-sans text-left">
          {RenderContent(content)}
        </div>

        
      </motion.div>
    </>
  );
};

export default Page;

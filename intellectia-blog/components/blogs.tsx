import type { NextPage } from "next";
import BlogCard from "./BlogCard";



const Blogs = ({BlogData}:any) => {
  return (
    <><BlogCard BlogData={BlogData} /></>
  );
};

export default Blogs;

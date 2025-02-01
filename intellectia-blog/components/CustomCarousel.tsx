'use client'
import Carousel from "@/components/Carousel";
import { NextPage } from "next";
import Link from "next/link";

    export type CustomCarousel = {
        id:any
      };

const CustomCarousel : NextPage<CustomCarousel> = ({ id }) => {
    const imageURL="http://localhost:1337"+id.attributes.url;
return(
    
        <div>
        <img src={imageURL}/> 
        </div>
    
           
  )};
export default CustomCarousel;
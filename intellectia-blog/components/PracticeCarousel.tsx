'use client'
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { NextPage } from "next";
import Link from "next/link";
import CustomCarousel from "./CustomCarousel";

    export type PracticeCarousel = {
        className?: string;
        HomePageCarousel?: any;
        missionLine?:any
      };

const PracticeCarousel : NextPage<PracticeCarousel> = ({ className = "",HomePageCarousel,missionLine }) => {
    
return (
    <div className={`dark:bg-gray-800 flex-1 flex flex-dir1 justify-start py-20 px-20 mdHome ${className}`}>
  
<Carousel className="mdHomeImg img-fit shrink-0" showThumbs={false} autoPlay>
    {HomePageCarousel?.map((id: any) => (
    
          <CustomCarousel id={id}/>
          
        )     
        
    )}
    </Carousel>
    
    <div className="text-119xlhome text-white font-dm-serif-display px-30 py-10">
        <div className="relative">
          {missionLine}
        </div>
        
      <Link href="/contact" className="li-a" legacyBehavior passHref>
            
              <button className="font-semibold text-gray-300 transition-colors duration-200 transform GetInTouch rounded-md hover:bg-white-200 bg-gray-800">
                Get In Touch
              </button>
            </Link>
            
      </div>
      
    </div>
   
    
)
};
export default PracticeCarousel;

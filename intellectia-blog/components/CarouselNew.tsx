'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // React Icons for navigation arrows
import CardNew from "./CardNew";
import { Carousel } from "react-responsive-carousel";

const CarouselNew = ({BlogPosts}:any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BlogPosts.length);
  };

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? BlogPosts.length - 1 : prevIndex - 1
    );
  };
  console.log(currentIndex)
  return (
    <>
    <div className="carousel-container ">
   
    
    <div className="controls items-center flex flex-dir1 transition-transform duration-500 ptx-50">
      <div>
    <button onClick={goPrev} className="control-prev transform -translate-y-1/2">
     <FaChevronLeft size={30} />
     </button>
    </div>
<div>
      <CardNew BlogPosts={BlogPosts[currentIndex]} alt="Carousel Image" />
</div>
<div>
          <CardNew BlogPosts={BlogPosts[currentIndex + 1]} alt="Carousel Image" />
</div>
     <div>
     <button onClick={goNext} className="control-next transform -translate-y-1/2">
        <FaChevronRight size={30} />
     </button>
      </div>
     </div>
      
    </div>
   
    <style>{`
        .carousel-container {
          display: flex;
          height:700px;
          max-width: 100%;
          align: items-center;
        }

        .carousel {
          
          width: 600px;
          height: 300px;
        }

        .ptx-50{
        padding-left:80px;
        padding-right:70px;
        }

        .controls {
          top: 50%;
          width: 10%;
          display: flex;
          justify-content: space-between;
          padding-top:40px;
          padding-bottom:40px;
        }

        .control-prev, .control-next {
          height:50px;
          border: none;
          color: white;
          padding: 5px;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.3s;
        }

        .control-prev:hover, .control-next:hover {
          background: rgba(0, 0, 0, 0.7);
        }
      `}</style></>
   
  );
};

export default CarouselNew;

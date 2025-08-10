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
   
    
    <div className="controls items-center flex flex-col md:flex-row transition-transform duration-500 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="hidden md:block">
    <button onClick={goPrev} className="control-prev transform -translate-y-1/2">
     <FaChevronLeft size={30} />
     </button>
    </div>
<div className="w-full md:w-auto">
      <CardNew BlogPosts={BlogPosts[currentIndex]} alt="Carousel Image" />
</div>
{BlogPosts[currentIndex + 1] && (
  <div className="w-full md:w-auto hidden md:block">
    <CardNew BlogPosts={BlogPosts[currentIndex + 1]} alt="Carousel Image" />
  </div>
)}
     <div className="hidden md:block">
     <button onClick={goNext} className="control-next transform -translate-y-1/2">
        <FaChevronRight size={30} />
     </button>
      </div>
      
      {/* Mobile navigation buttons */}
      <div className="flex justify-between w-full mt-4 md:hidden">
        <button onClick={goPrev} className="control-prev bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
          <FaChevronLeft size={20} />
        </button>
        <button onClick={goNext} className="control-next bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
          <FaChevronRight size={20} />
        </button>
      </div>
     </div>
      
    </div>
   
    <style>{`
        .carousel-container {
          display: flex;
          min-height: 400px;
          max-width: 100%;
          align-items: center;
        }
        
        @media (min-width: 768px) {
          .carousel-container {
            height: 700px;
          }
        }

        .carousel {
          width: 100%;
          max-width: 600px;
          height: 300px;
        }
        
        @media (max-width: 767px) {
          .carousel {
            height: 250px;
          }
        }

        .controls {
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
        }
        
        @media (min-width: 768px) {
          .controls {
            padding: 40px 0;
          }
        }

        .control-prev, .control-next {
          height: 40px;
          border: none;
          color: white;
          padding: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
          border-radius: 50%;
        }
        
        @media (min-width: 768px) {
          .control-prev, .control-next {
            height: 50px;
            font-size: 18px;
          }
        }

        .control-prev:hover, .control-next:hover {
          background: rgba(0, 0, 0, 0.7);
        }
      `}</style></>
   
  );
};

export default CarouselNew;

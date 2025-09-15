'use client'
import { motion } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/navigation';


const CardNew = ({ BlogPosts }: any ) => {
  const router = useRouter();
const imageUrl = "http://localhost:1337" + BlogPosts.attributes.cover.data.attributes.url;
const title = BlogPosts.attributes.title;
const desc = BlogPosts.attributes.ShortDesc;
  return (
    
    <div className="card-containerLandingPage">
      <div className="cardLandingPage">

        <img
          src={imageUrl}
          alt="Card Image"
          className="card-imageLandingPage"
        />
        <div className="card-contentLandingPage">
          <div className="h-64">
          <h2 className="card-titleLandingPage">{title}</h2>
          <p className="card-descriptionLandingPage font-dm-sans line-clamp-6">
            {desc}
          </p>
          </div>
          <button className="card-buttonLandingPage" onClick={() => router.push(`/Blogs/${BlogPosts.id}`)}>Read More</button>
        </div>
      </div>

     
    </div>
   
  );
};

export default CardNew;

'use client'
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from "react";
const BlogCard = ({ BlogData }: any) => {
    const ID = BlogData.id;
  const { title, ShortDesc, cover } = BlogData.attributes;
  const imageUrl = "http://localhost:1337" + cover?.data?.attributes?.url;
  const imageAlt = cover?.data?.attributes?.alternativeText || title;
    console.log(ID)
    return (
        <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
        <div className="flex-row rounded-lg shadow-md border border-gray-600 cursor-pointer">
        <Link href={`/Blogs/${ID}`} className="no-underline text-inherit" passHref>
        <div className="cursor-pointer">
          {imageUrl && (
            <div className="relative w-full h-48">
              <Image
                src={imageUrl}
                alt={imageAlt}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
          )}

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
            <p className="text-sm text-gray-600">{ShortDesc}</p>
          </div>
        </div>
      </Link>
        </div>
        </motion.div>
    )
}
export default BlogCard;
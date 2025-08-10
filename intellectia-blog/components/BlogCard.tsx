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
            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
        >
            <Link href={`/Blogs/${ID}`} className="no-underline text-inherit h-full flex flex-col" passHref>
                <div className="cursor-pointer h-full flex flex-col">
                    {imageUrl && (
                        <div className="relative w-full h-48 sm:h-52 lg:h-56 flex-shrink-0">
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-xl"
                            />
                        </div>
                    )}

                    <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 flex-grow flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2 flex-shrink-0">{title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 line-clamp-3 flex-grow">{ShortDesc}</p>
                        <div className="pt-2 flex-shrink-0">
                            <span className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                                Read More →
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
export default BlogCard;
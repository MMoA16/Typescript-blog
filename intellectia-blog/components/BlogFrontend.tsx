'use client'
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from "react";
import BlogCard from "./BlogCard";
const BlogFrontend = ({ strapiBlogData }: any) => {
    return(
    <div className="container mx-auto px-4 py-6">
            <motion.div
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                transition: {
                    staggerChildren: 0.15,
                },
                },
            }}
            >
            {strapiBlogData?.data?.map((category: any) => (
                <motion.div
                key={category.id}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                >
                <BlogCard BlogData={category} />
                </motion.div>
            ))}
            </motion.div>
        </div>
    )
}
export default BlogFrontend;
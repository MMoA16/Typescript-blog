import Link from "next/link";
import Image from 'next/image';
import React from "react";
const BlogCard = ({ BlogData }: any) => {
    let ID = BlogData.id;
    const imageUrl = "http://localhost:1337" + BlogData.attributes.cover.data.attributes.url;
    console.log(ID)
    return (
        <div className="flex-row rounded-lg shadow-md border border-gray-600 cursor-pointer">
            <Link href={"/Blogs/" + ID}>
                <div>
                    <img
                        src={imageUrl}
                        alt={""}
                        width={500} height={300}
                        
                    />
                </div>
                <div>
                    <h3 className="text-sm font-semibold mb-2 overflow-ellipsis">
                        {BlogData.attributes.title}
                    </h3>
                </div>
            </Link>
            <div>
            <p className="text-gray-600">{BlogData.attributes.ShortDesc}</p>
            </div>
        </div>
    )
}
export default BlogCard;
import React from "react";
import { blog_data } from "@/Data/Data";
import { Data } from "@/Data/Data";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ image, title, description, id }) => {
  return (
    <>
      <div className="mt-13 md:mt-20 max-w-[330px]  sm:max-w-[300px] mx-5 bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
        
        <Link href={`/knowledge/${id}`}>
          <Image
            src={image}
            alt="blog image"
            width={400}
            height={400}
            className="border-b border-gray-400"
          />

          <div className="p-5">
            <h3 className="mb-2 tracking-tight font-medium text-lg text-gray-900">
              {title}
            </h3>
            <div>
              <p className="mb-3 tracking-tight  text-sm text-gray-700">
                {description}
              </p>
            </div>
            <div className="cursor-pointer inline-flex items-center py-2 font-semibold text-center ">
              read more <Image src={Data.arrow} alt="arrow" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BlogItem;

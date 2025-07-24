import React from "react";
import { Data } from "@/Data/Data";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";

const BlogItem = ({ image, title, description, id }) => {
  return (
    <div className="mt-10 md:mt-16 max-w-[330px] sm:max-w-[300px] mx-4 bg-white border border-black rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[-7px_7px_0px_#000000] hover:-translate-y-1">
      <Link href={`/knowledge/${id}`}>
        <div className="relative w-full h-[200px] sm:h-[180px] overflow-hidden">
          <Image
            src={image}
            alt="blog image"
            
            fill
            className="object-cover border-b border-gray-300"
          />
        </div>

        <div className="p-4 sm:p-5 flex flex-col justify-between h-[250px] sm:h-[260px]">
          <h3 className="mb-2 font-semibold text-lg text-gray-900 leading-tight line-clamp-2">
            {title}
          </h3>

          <div
            className="mb-4 text-sm text-gray-700 leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />

          <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mt-auto hover:underline">
            Read more
            <Image src={Data.arrow} alt="arrow" width={16} height={16} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;

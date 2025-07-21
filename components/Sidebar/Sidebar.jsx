import React from "react";
import Image from "next/image";
import { Data } from "@/Data/Data";
import Link from "next/link";
const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col bg-slate-100">
        <div className="w-28 sm:w-80 h-[100vh] relative py-12 ">

            <div className="w-[50%] sm:w-[80%] mx-auto mt-10">

          <Link href="/admin/addblog" className="  flex items-center border border-black font-medium  gap-3 px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000]">

           <Image src={Data.add_icon}  alt="add icon " width={20} />Add Blogs

          </Link>

           <Link href='/admin/bloglist' className=" mt-7 flex items-center border border-black font-medium  gap-3 px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000]">

           <Image src={Data.blog_icon}  alt="add icon " width={20} /> Blog Lists

          </Link>


           <Link href="/admin/publication" className=" mt-7 flex items-center border border-black font-medium  gap-3 px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000]">

           <Image src={Data.add_icon}  alt="addicon " width={20} />Add Publications

          </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

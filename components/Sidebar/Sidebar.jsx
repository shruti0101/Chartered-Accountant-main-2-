"use client";
import React from "react";
import Image from "next/image";
import { Data } from "@/Data/Data";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Sidebar = () => {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex flex-col bg-slate-100">
      <div className="w-28 sm:w-80 h-screen relative py-25 px-2 sm:px-0">
        <div className="w-full sm:w-[80%] mx-auto mt-10 space-y-7">
          <Link
            href="/admin/addblog"
            className="flex flex-wrap items-center border border-black font-medium gap-3 px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000] text-sm sm:text-base break-words"
          >
            <Image src={Data.add_icon} alt="add icon" width={20} />
            <span className="break-words">Add Blogs</span>
          </Link>

          <Link
            href="/admin/bloglist"
            className="flex flex-wrap items-center border border-black font-medium gap-3 px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000] text-sm sm:text-base break-words"
          >
            <Image src={Data.blog_icon} alt="blog icon" width={20} />
            <span className="break-words">Blog Lists</span>
          </Link>

          <Link
            href="/admin/publication"
            className="flex flex-wrap items-center border border-black font-medium gap-3 px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000] text-sm sm:text-base break-words"
          >
            <Image src={Data.add_icon} alt="add publication icon" width={20} />
            <span className="break-words">Add Publications</span>
          </Link>

          <Link
            href="/admin/pdflist"
            className="flex flex-wrap items-center border border-black font-medium gap-3 px-3 py-2 bg-white shadow-[-7px_7px_0px_#000000] text-sm sm:text-base break-words"
          >
            <Image src={Data.blog_icon} alt="pdf icon" width={20} />
            <span className="break-words">PDF Lists</span>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-5 mx-auto">
          <button
            onClick={logoutHandler}
            className="bg-zinc-800 px-3 py-2 rounded-md text-white hover:bg-zinc-700 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

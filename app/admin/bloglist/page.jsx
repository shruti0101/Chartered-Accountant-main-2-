"use client";

import BlogTable from "@/components/Blogtableitem/BlogTable";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/api/blog");
    setBlogs(res.data.blogs);
  };


  const deleteBlog = async(mongoId)=>{
const res= await axios.delete("/api/blog", {
  params:{
id:mongoId
  }
});
toast.success(res.data.message);

fetchData();
  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1 pt-6 px-4 sm:pt-12 sm:px-16 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b border-gray-300 pb-3">
        All Blogs
      </h1>

      {/* Table Container */}
      <div className="relative h-[85vh] max-w-7xl overflow-y-auto mt-6 rounded-lg shadow-md bg-white border border-gray-200 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <table className="w-full text-gray-600">
          <thead className="text-sm font-semibold text-gray-700 uppercase bg-gray-100 sticky top-0 z-10 shadow-sm">
            <tr className="grid grid-cols-3  text-center sm:table-row">
              <th className="px-6 py-4 text-left">Blog Title</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className=" px-3 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((item, index) => {
              return <BlogTable key={index} deleteBlog={deleteBlog}  mongoId={item._id} title={item.title} date={item.date}/>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;

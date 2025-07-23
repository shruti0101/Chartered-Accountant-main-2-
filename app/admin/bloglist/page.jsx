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

  const deleteBlog = async (mongoId) => {
    const res = await axios.delete("/api/blog", {
      params: {
        id: mongoId,
      },
    });
    toast.success(res.data.message);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1 pt-6 px-4 sm:pt-12 sm:px-16 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b border-gray-300 pb-3">
        All Blogs
      </h1>

      {/* TABLE VIEW FOR DESKTOP */}
      <div className="hidden sm:block mt-6 overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-md">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-4">Blog Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((item, index) => (
              <BlogTable
                key={index}
                deleteBlog={deleteBlog}
                mongoId={item._id}
                title={item.title}
                date={item.date}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW FOR MOBILE */}
      <div className="sm:hidden mt-6 space-y-4">
        {blogs.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 space-y-2"
          >
            <div className="text-sm text-gray-700 font-semibold">
              Blog Title:
            </div>
            <div className="text-base text-gray-900 break-words">
              {item.title}
            </div>

            <div className="text-sm text-gray-700 font-semibold mt-2">Date:</div>
            <div className="text-base text-gray-900">{item.date}</div>

            <div className="mt-4">
              <button
                onClick={() => deleteBlog(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

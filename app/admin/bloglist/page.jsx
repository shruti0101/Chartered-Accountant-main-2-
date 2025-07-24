"use client";

import BlogTable from "@/components/Blogtableitem/BlogTable";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/api/blog");
    setBlogs(res.data.blogs);
  };

  const deleteBlog = async (mongoId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

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
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <Link
                    href={`/admin/edit-blog?id=${item._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBlog(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
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
            <div className="text-sm text-gray-700 font-semibold">Blog Title:</div>
            <div className="text-base text-gray-900 break-words">{item.title}</div>

            <div className="text-sm text-gray-700 font-semibold mt-2">Date:</div>
            <div className="text-base text-gray-900">
              {new Date(item.date).toLocaleDateString()}
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                href={`/admin/edit-blog?id=${item._id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </Link>
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

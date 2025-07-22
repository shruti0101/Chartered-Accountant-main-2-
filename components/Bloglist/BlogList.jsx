'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../Blogitem/BlogItem";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Added loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false); // 👈 Hide loader after data fetched or error
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-[300px] mb-16 xl:mx-24">
      {loading ? (
        // 👇 Simple Tailwind spinner
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-40"></div>
        </div>
      ) : blogs.length > 0 ? (
        <div className="flex flex-wrap justify-around gap-1 gap-y-10">
          {blogs.map((item, index) => (
            <BlogItem
              key={index}
              image={item.image}
              title={item.title}
              id={item._id}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;

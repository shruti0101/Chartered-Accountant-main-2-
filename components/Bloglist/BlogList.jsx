'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../Blogitem/BlogItem";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-[300px] mb-20 px-4 sm:px-6 xl:px-24">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
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

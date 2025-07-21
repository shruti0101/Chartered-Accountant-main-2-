'use client'

import { blog_data } from "@/Data/Data";
import React from "react";
import BlogItem from "../Blogitem/BlogItem";
import axios from "axios";
import { useEffect, useState } from "react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24 ">
        {blogs.map((item, index) => {
          return (
            <BlogItem
              key={index}
              image={item.image}
              title={item.title}
              id={item._id}
              description={item.description}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlogList;

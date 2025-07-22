"use client";

import React from "react";
import { FaUsers, FaFileAlt, FaCog } from "react-icons/fa";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* Welcome Section */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Welcome to the Admin Panel
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Manage blogs, Publications from one central dashboard.
        </p>

        {/* Dashboard Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Blogs Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <FaFileAlt className="text-blue-500 text-4xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Manage Blogs</h2>
            <p className="text-gray-600 mt-2 text-sm">
              View create and delete all blog posts here.
            </p>
          </div>

          {/* Users Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <FaUsers className="text-green-500 text-4xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Manage Publications</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Add ,View and Delete PDFs 
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;

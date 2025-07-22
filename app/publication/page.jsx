"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get("/api/publications");
        setPublications(response.data);
      } catch (error) {
        console.error("Failed to fetch publications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="px-4 py-10 md:px-10 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1C398E] leading-tight mb-6">
          Your Trusted Source for Financial Insights
        </h1>

        {/* Subtext */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-20">
          Explore our curated collection of publications, circulars, and expert
          analyses on taxation, audit, regulatory compliance, and financial
          planning. Stay informed with timely updates and in-depth knowledge to
          support your business and professional goals—brought to you by
          experienced Chartered Accountants.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading publications...</p>
      ) : publications.length === 0 ? (
        <p className="text-center text-gray-500">No publications found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publications.map((pub, index) => (
            <div
              key={pub._id}
              className={`rounded-lg shadow-md hover:shadow-lg transition p-6 ${
                index % 3 === 0
                  ? "bg-[#001F61] text-white"
                  : "bg-[#001F61] text-white"
              }`}
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow ${
                    index % 3 === 0 ? "" : "bg-[#D6E4F0]"
                  }`}
                >
                  <FaFilePdf
                    className={`text-3xl ${
                      index % 3 === 0 ? "text-[#001F61]" : "text-[#002B5B]"
                    }`}
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-center mb-2">
                {pub.title}
              </h2>

              {pub.description && (
                <p className="text-center text-sm mb-4">{pub.description}</p>
              )}

              <div className="text-center">
                <a
                  href={pub.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-5 py-2 rounded border ${
                    index % 3 === 0
                      ? "border-white text-white hover:bg-white hover:text-[#001F61]"
                      : "border-white text-white hover:bg-white hover:text-[#001F61]"
                  } transition`}
                >
                  Know More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadPublication() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("title", title);
    data.append("description", description);

    try {
      await axios.post("/api/publications", data);
      toast.success("Uploaded PDF successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      document.getElementById("pdf-upload").value = "";
    } catch (error) {
      toast.error("Failed to upload PDF");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-10 border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Upload Your PDFs Here
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter PDF title"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter PDF description"
              rows={4}
              className="w-full border rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="pdf-upload"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              PDF File
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:rounded file:border-gray-300 file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-100"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition"
            >
              Upload PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

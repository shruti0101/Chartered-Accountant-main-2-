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

      // ✅ Clear all fields
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
    <>
      <section className="text-3xl font-bold text-center p-5">
        Upload Your PDFs Here..
      </section>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl bg-gray-100  mt-10 mx-auto p-6 space-y-4 border rounded"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload PDF
        </button>
      </form>
    </>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditBlogPage() {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);

  // Fetch blog details
  useEffect(() => {
    if (blogId) {
      axios.get(`/api/blog?id=${blogId}`).then((res) => {
        const blog = res.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setExistingImage(blog.image);
      });
    }
  }, [blogId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("id", blogId);
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.put("/api/blog", formData);
      toast.success(res.data.message);
      router.push("/admin/bloglist");
    } catch (err) {
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 pt-6 px-4 sm:pt-12 sm:px-16 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b pb-3">
        Edit Blog
      </h1>

      <form onSubmit={handleUpdate} className="mt-6 space-y-4 max-w-2xl">
        <label className="block text-gray-700 font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-3 rounded"
          type="text"
          placeholder="Blog Title"
          required
        />

        <label className="block text-gray-700 font-medium">Description</label>
        <JoditEditor
          ref={editor}
          value={description}
          onChange={(newContent) => setDescription(newContent)}
        />

        <div>
          <label className="block text-gray-700 font-medium">Current Image</label>
          {existingImage && (
            <Image
              src={existingImage}
              alt="Blog Thumbnail"
              width={200}
              height={200}
              className="mt-2 rounded border"
            />
          )}
        </div>

        <label className="block text-gray-700 font-medium">Replace Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border px-4 py-3 rounded"
        />

        <button
          type="submit"
       
          disabled={loading}
          className={`px-6 py-2 bg-blue-600 text-white mb-6 rounded hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

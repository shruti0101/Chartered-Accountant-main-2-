"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { Data } from "@/Data/Data";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import JoditEditor from "jodit-react";

const Page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({ title: "" });
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editor = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitbutton = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", description);

    try {
      const res = await axios.post("/api/blog", formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setImage(false);
        setData({ title: "" });
        setDescription("");
      } else {
        toast.error("Error in uploading blog");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-5 px-5 sm:pt-12 sm:pl-16 mb-10">
      {/* Blog Upload Form */}
      <form onSubmit={submitbutton}>
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? Data.upload_area : URL.createObjectURL(image)}
            alt="upload area"
            width={200}
            height={200}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        <p className="text-xl mt-4">Title</p>
        <input
          onChange={handleChange}
          name="title"
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />

        <p className="text-xl mt-6 font-semibold">Description</p>

        <JoditEditor
          ref={editor}
          value={description}
          onChange={(newContent) => setDescription(newContent)}
        />

        <br />
        <button
          className={`cursor-pointer mt-8 w-32 tracking-wide h-12 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {/* Blog Preview (so you can see lists render properly) */}
      <div
        className="prose max-w-none mt-12"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default Page;

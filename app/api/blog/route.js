import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connect } from "@/Database/Db";

import Blog from "@/models/blog";

const loadDB = async () => {
  await connect();
};

loadDB();

// api endpoint to get all   blog data

export async function GET(request) {


  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await Blog.findById(blogId);
   return NextResponse.json(blog);
  }
  else{

      const blogs = await Blog.find({});

  return NextResponse.json({blogs});

  }

}







// api endpoint for uploading blog data
// This function handles the POST request to save blog data
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image || typeof image === "string") {
      return NextResponse.json({ success: false, message: "No image uploaded" }, { status: 400 });
    }

    // Convert uploaded file to buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Build a safe file path
    const originalName = image.name;
    const extension = originalName.split(".").pop();
    const fileName = `${timestamp}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "blog"); // Ensure folder exists
    const filePath = path.join(uploadDir, fileName);

    // Save file
    await writeFile(filePath, buffer);

    // Prepare image URL (for public access)
    const imageUrl = `/blog/${fileName}`;

    // Save blog entry to MongoDB
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: imageUrl,
      date: new Date(timestamp),
    };

    const savedBlog = await Blog.create(blogData);

    return NextResponse.json({
      message: "Blog data saved successfully",
      success: true,
      blog: savedBlog,
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}

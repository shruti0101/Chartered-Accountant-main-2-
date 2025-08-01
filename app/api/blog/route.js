import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connect } from "@/Database/Db";
const fs = require("fs");
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
  } else {
    const blogs = await Blog.find({}).sort({ date: -1 }); // Sort by date DESC

    return NextResponse.json({ blogs });
  }
}

// api endpoint for deleting the blog

// api endpoint for deleting the blog
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Properly resolve the image path
    const imagePath = path.join(process.cwd(), "public", blog.image.replace(/^\/+/, "")); 

    // Delete image if it exists
    try {
      await fs.promises.unlink(imagePath);
      console.log(`Deleted image: ${imagePath}`);
    } catch (err) {
      console.warn("Image not found, skipping delete:", imagePath);
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// api endpoint for data updation
// PUT - Update blog
// Handle blog update (PUT)
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blog.title = formData.get("title");
    blog.description = formData.get("description");

    const image = formData.get("image");
    if (image && typeof image !== "string") {
      // Handle new image upload
      const timestamp = Date.now();
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const extension = image.name.split(".").pop();
      const fileName = `${timestamp}.${extension}`;
      const filePath = path.join(process.cwd(), "public", "blog", fileName);

      await writeFile(filePath, buffer);

      // Delete old image
      const oldPath = path.join(process.cwd(), "public", blog.image.replace(/^\/+/, ""));
      try {
        await fs.promises.unlink(oldPath);
      } catch {}

      blog.image = `/blog/${fileName}`;
    }

    await blog.save();

    return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
      return NextResponse.json(
        { success: false, message: "No image uploaded" },
        { status: 400 }
      );
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
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

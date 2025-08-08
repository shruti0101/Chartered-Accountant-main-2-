import { NextResponse } from "next/server";

import { connect } from "@/Database/Db";

import Blog from "@/models/blog";
import imagekit from "@/utils/imageKit";
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

    if (blog.fileId) {
      await imagekit.deleteFile(blog.fileId);
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
      // Delete old image from ImageKit
      if (blog.fileId) {
        await imagekit.deleteFile(blog.fileId);
      }

      // Upload new image
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `${Date.now()}-${image.name}`,
        folder: "/blogs",
      });

      blog.image = imagekit.url({
        path: uploadResponse.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "700" },
          { height: "400" },
        ],
      });

      blog.fileId = uploadResponse.fileId;
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

    // Upload to ImageKit
    const uploadedImage = await imagekit.upload({
      file: buffer,
      fileName: `${timestamp}-${image.name}`,
      folder: "/blogs",
    });

    // Build transformed URL
    const optimizedImageUrl = imagekit.url({
      path: uploadedImage.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "700" },
        { height: "400" },
      ],
    });

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: optimizedImageUrl,
      fileId: uploadedImage.fileId,
      date: new Date(timestamp),
    };

    const savedBlog = await Blog.create(blogData);

    return NextResponse.json({
      message: "Blog data saved successfully",
      success: true,
      blog: savedBlog,
    });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

import { v4 as uuidv4 } from "uuid";
import { connect } from "@/Database/Db";
import Publication from "@/models/Publication";
import cloudinary from "@/utils/cloudinary";

// Node.js runtime required for file buffer access
export const runtime = "nodejs";

// 📤 POST: Upload PDF to Cloudinary
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");

    if (!file || typeof file === "string" || !title || !description) {
      return new Response("Missing fields or invalid file", { status: 400 });
    }

    if (!file.type.includes("pdf")) {
      return new Response("Only PDF files are allowed", { status: 400 });
    }

    // Convert file to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
 const result = await cloudinary.uploader.upload(dataURI, {
  resource_type: "raw", // ✅ FORCE raw, so PDFs are treated correctly
  folder: "publications",
  public_id: uuidv4(),
  use_filename: true,
  unique_filename: false,
});


    await connect();
    const publication = await Publication.create({
      title,
      description,
      fileUrl: result.secure_url,     // ✅ Cloudinary-hosted URL
      cloudinaryId: result.public_id, // ✅ Save for future deletion
    });

    return new Response(JSON.stringify(publication), {
      status: 201,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new Response("Failed to upload PDF", { status: 500 });
  }
}

// 📄 GET: Fetch all publications
export async function GET() {
  try {
    await connect();
    const publications = await Publication.find().sort({ _id: -1 });
    return new Response(JSON.stringify(publications), { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response("Failed to fetch publications", { status: 500 });
  }
}

// ❌ DELETE: Remove file from Cloudinary and DB
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  try {
    await connect();
    const publication = await Publication.findById(id);
    if (!publication) {
      return new Response("Publication not found", { status: 404 });
    }

    // Delete file from Cloudinary (if stored)
    if (publication.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(publication.cloudinaryId, {
          resource_type: "raw",
        });
      } catch (cloudErr) {
        console.warn("Cloudinary deletion failed:", cloudErr.message);
      }
    }

    await Publication.findByIdAndDelete(id);
    return new Response("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Deletion error:", error);
    return new Response("Server error", { status: 500 });
  }
}

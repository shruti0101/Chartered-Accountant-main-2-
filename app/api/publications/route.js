import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { connect } from "@/Database/Db";
import Publication from "@/models/Publication";
import fs from "fs/promises";

// Use Node.js runtime to enable fs and file handling in Next.js App Router
export const runtime = "nodejs";

// POST: Upload PDF
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuidv4()}-${file.name}`;
    const dir = path.join(process.cwd(), "public", "uploads");

    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, filename);

    await writeFile(filePath, buffer);

    await connect();
    const publication = await Publication.create({
      title,
      description,
      fileUrl: `/uploads/${filename}`,
    });

    return new Response(JSON.stringify(publication), {
      status: 201,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new Response("Failed to upload PDF", { status: 500 });
  }
}

// GET: Fetch all publications
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

// DELETE: Delete publication and PDF file
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

    const filePath = path.join(process.cwd(), "public", publication.fileUrl);
    try {
      await fs.unlink(filePath);
      console.log("Deleted file:", filePath);
    } catch (err) {
      console.warn("File not found or already deleted:", filePath);
    }

    await Publication.findByIdAndDelete(id);
    return new Response("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Deletion error:", error);
    return new Response("Server error", { status: 500 });
  }
}

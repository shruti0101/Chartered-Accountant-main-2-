import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { connect } from "@/Database/Db";
import Publication from "@/models/Publication";
import fs from "fs/promises";


export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const title = formData.get("title");
  const description = formData.get("description");

  if (!file || !title || !description) {
    return new Response("Missing fields", { status: 400 });
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
}



// api endpoint for deletion

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

    // Extract filename from fileUrl (e.g., "/uploads/filename.pdf")
    const filePath = path.join(process.cwd(), "public", publication.fileUrl);

    // Delete file from disk
    try {
      await fs.unlink(filePath);
      console.log(`Deleted file at ${filePath}`);
    } catch (err) {
      console.warn("Could not delete file (might not exist):", filePath);
    }

    // Delete from MongoDB
    await Publication.findByIdAndDelete(id);

    return new Response("Publication deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting publication:", error);
    return new Response("Server error", { status: 500 });
  }
}

// api endpoint for fetching all pdfs

export async function GET() {
  await connect();
  const publications = await Publication.find().sort({ _id: -1 });
  return new Response(JSON.stringify(publications), { status: 200 });
}

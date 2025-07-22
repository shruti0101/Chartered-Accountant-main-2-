import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { connect } from "@/Database/Db";
import Publication from "@/models/Publication";

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

export async function GET() {
  await connect();
  const publications = await Publication.find().sort({ _id: -1 });
  return new Response(JSON.stringify(publications), { status: 200 });
}

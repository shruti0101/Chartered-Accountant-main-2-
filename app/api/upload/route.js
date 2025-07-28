// app/api/upload/route.js
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { connect } from '@/Database/Db';
import Publication from '@/models/Publication';

// Disable body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const uploadDir = path.join(process.cwd(), '/public/uploads');
    await fs.promises.mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { title, description } = data.fields;
    const file = data.files.file[0];
    const fileUrl = `/uploads/${path.basename(file.filepath)}`;

    await connect();
    const publication = await Publication.create({ title, description, fileUrl });

    return NextResponse.json({ message: 'Uploaded!', data: publication }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

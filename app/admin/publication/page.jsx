'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

export default function UploadPublication() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("title", title);
    data.append("description", description);

    await axios.post("/api/publications", data);
    toast.success("Uploaded PDF successfully!");  
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4 border rounded">
      <input type="text" placeholder="Title" className="w-full border p-2" onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" className="w-full border p-2" onChange={e => setDescription(e.target.value)} required />
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload PDF</button>
    </form>
  );
}

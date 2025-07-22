'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const PublicationList = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await axios.get('/api/publications');
        setPublications(res.data);
      } catch (err) {
        console.error("Failed to load publications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this publication?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/publications?id=${id}`);
      setPublications(prev => prev.filter(pub => pub._id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1C398E]">All Publications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : publications.length === 0 ? (
        <p className="text-gray-500">No publications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#001F61] text-white">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Uploaded</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub) => (
                <tr key={pub._id} className="border-b">
                  <td className="px-6 py-4 font-medium">{pub.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{pub.description.slice(0, 100)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(pub._id.toString().substring(0, 8) * 1000).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <a
                      href={pub.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      View PDF
                    </a>
                    <button
                      onClick={() => handleDelete(pub._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PublicationList;

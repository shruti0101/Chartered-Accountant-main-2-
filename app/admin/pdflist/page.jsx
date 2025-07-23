'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    if (!window.confirm("Are you sure you want to delete this publication?")) return;

    try {
      await axios.delete(`/api/publications?id=${id}`);
      setPublications((prev) => prev.filter((pub) => pub._id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Delete failed.");
    }
  };

  const formatDate = (id) => {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000).toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#1C398E]">All Publications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : publications.length === 0 ? (
        <p className="text-gray-500">No publications found.</p>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden sm:block w-full overflow-x-auto">
            <table className="min-w-full table-auto bg-white border border-gray-200">
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
                    <td className="px-6 py-4 font-medium break-words">{pub.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 break-words">
                      {pub.description.slice(0, 100)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(pub._id)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap justify-center gap-3">
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="sm:hidden space-y-4">
            {publications.map((pub) => (
              <div
                key={pub._id}
                className="border border-gray-200 bg-white rounded-lg p-4 shadow-sm w-full overflow-hidden"
              >
                <div className="text-base font-semibold text-gray-800 break-words">
                  {pub.title}
                </div>
                <div className="text-sm text-gray-600 mt-1 break-words">
                  {pub.description.slice(0, 150)}...
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Uploaded: {formatDate(pub._id)}
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={pub.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    View PDF
                  </a>
                  <button
                    onClick={() => handleDelete(pub._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PublicationList;

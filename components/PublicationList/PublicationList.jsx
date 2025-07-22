'use client';
import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicationList() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/publications");
      setPublications(res.data);
    };
    fetchData();
  }, []);

  return ( 
    <div className="flex flex-wrap justify-around gap-8 p-10">
      {publications.map((pub) => (
        <div key={pub._id} className="bg-white rounded-lg shadow-md p-6 max-w-xs text-center hover:shadow-xl transition duration-300">
          <img src="/pdf-icon.png" alt="pdf" className="w-12 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">{pub.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{pub.description.slice(0, 120)}...</p>
          <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
            Know More &rarr;
          </a>
        </div>
      ))}
    </div>
  );
}

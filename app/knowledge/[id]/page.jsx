'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';

const Page = () => {
  const [data, setData] = useState(null);
  const params = useParams();

  const fetchBlog = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: { id: params.id },
      });

      setData(response.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!data ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-10 text-center">{data.title}</h1>
            <Image
              src={data.image}
              alt="Blog Thumbnail"
              className="rounded-lg border-4 border-white mb-6 mx-auto shadow-2xl"
              width={800}
              height={300}
            />

            <div
              className="text-lg leading-relaxed text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description),
              }}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Page;

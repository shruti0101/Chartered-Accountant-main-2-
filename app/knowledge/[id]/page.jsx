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
    <section className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!data ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-[#1C398E] leading-snug">
              {data.title}
            </h1>

            <div className="w-full overflow-hidden rounded-lg shadow-xl mb-8">
              <Image
                src={data.image}
                alt="Blog Thumbnail"
                width={800}
                height={400}
                className="w-full object-cover max-h-[450px]"
              />
            </div>

            <div
              className="prose prose-lg max-w-none text-gray-700 prose-img:rounded-md prose-a:text-blue-600"
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

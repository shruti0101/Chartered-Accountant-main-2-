// import BlogItem from "@/components/Blogitem/BlogItem";
import React from "react";
import BlogList from "@/components/Bloglist/BlogList";

const KnowledgeHubHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#f5f8ff] to-[#e8f0ff] py-16 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1C398E] leading-tight mb-6">
          Empowering Businesses with Knowledge
        </h1>

        {/* Subtext */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Stay updated with the latest insights, tips, and resources on
          taxation, compliance, finance, and business growth. Our Knowledge Hub
          brings expert-curated articles, guides, and updates—all designed to
          help entrepreneurs, startups, and established businesses make informed
          decisions.
        </p>

      
      </div>

      {/* Decorative Shapes (Optional) */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#1C398E]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#1C398E]/5 rounded-full blur-3xl -z-10"></div>


<BlogList></BlogList>
{/* <BlogItem></BlogItem> */}


    </section>
  );
};

export default KnowledgeHubHero;

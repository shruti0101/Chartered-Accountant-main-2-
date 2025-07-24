"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import { FaChevronUp } from "react-icons/fa";
import AOS from "aos";
import "swiper/css";
import "swiper/css/navigation";
import "aos/dist/aos.css";

/* Map service titles to URLs (from navbar) */
const serviceLinks = {
  "Taxation Related Services": "/income-tax-filing",
  "ROC Compliance": "/annual-filings",
  "Book Keeping and Accounting Services": "/tally-quickbooks",
  "International Taxation": "/transfer-pricing",
  "Business Setup Solution": "/company-registration",
  "GST Related Services": "/gst-registration",
  "Audit and Assurance Services": "/statutory-audit",
};

/* Carousel data */
const services = [
  { title: "Taxation Related Services", image: "/services/tax.jpg" },
  { title: "ROC Compliance", image: "/services/compliance.jpeg" },
  { title: "Book Keeping and Accounting Services", image: "/services/book.jpg" },
  { title: "International Taxation", image: "/services/fdi.webp" },
  { title: "Business Setup Solution", image: "/services/businessadvice.webp" },
  { title: "GST Related Services", image: "/services/GSTFilling.jpg" },
  { title: "Audit and Assurance Services", image: "/services/Audit-Assurance.jpg" },
];

const ServicesCarousel = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-3 mb-15 bg-gradient-to-br from-white to-blue-50">
      {/* Heading */}
      <div
        className="text-center max-w-3xl mx-auto mb-16 px-4"
        data-aos="fade-up"
      >
        <div className="flex items-center justify-center">
          <div className="w-10 h-1 bg-sky-500 mr-3 rounded-full" />
          <h3 className="text-sky-600 font-bold uppercase tracking-[0.15em] text-sm sm:text-base">
            Our Services
          </h3>
          <div className="w-10 h-1 bg-sky-500 ml-3 rounded-full" />
        </div>

        <h2 className="relative inline-block font-bold text-[#1E2939] text-3xl sm:text-3xl md:text-5xl leading-snug group">
          Solutions tailored to your needs,
          <br />
          <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 bg-clip-text text-2xl md:text-5xl text-transparent">
            service perfected
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="md:max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              {/* Make each card clickable */}
              <Link href={serviceLinks[service.title] || "#"}>
                <div className="relative h-[420px] sm:h-[440px] md:h-[460px] w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-xl group cursor-pointer">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 group-hover:bg-black/20" />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1869C1] via-[#7DAADA]/30 to-transparent opacity-90 group-hover:h-full transition-all duration-500 z-20" />
                  {/* Title */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 text-white text-center transition-all duration-500 group-hover:bottom-28">
                    <h3 className="text-3xl font-extrabold tracking-wide drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                  {/* Explore More */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 text-white flex flex-col items-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6 transition-all duration-500">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-500 rotate-45 flex items-center justify-center shadow-md mb-2">
                      <FaChevronUp className="-rotate-45 text-white text-sm" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold">
                      Explore More
                    </span>
                  </div>
                  {/* Glow Border */}
                  <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-blue-400 transition-all duration-500 z-50 pointer-events-none" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServicesCarousel;

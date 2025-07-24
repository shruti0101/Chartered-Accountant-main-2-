"use client";

import { useState } from "react";

export default function FormSection() {
  const [status, setStatus] = useState(""); // To show success/error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setStatus("loading");

    try {
      const formData = new FormData(form);
      await fetch("https://formsubmit.co/agrawalchintan27@gmail.com", {
        method: "POST",
        body: formData,
      });

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-blue-600 text-center">
        Get Your Quote & Free Consultation
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Disable Captcha (optional) */}
        <input type="hidden" name="_captcha" value="false" />
        {/* Honeypot for spam */}
        <input type="text" name="_honey" className="hidden" />

        <div className="grid md:grid-cols-2 gap-4">
          <Input name="name" label="Name" type="text" placeholder="Your Name" required />
          <Input name="phone" label="Phone" type="tel" placeholder="+91 81234 56789" required />
        </div>
        <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
        <Input name="message" label="Message" type="text" placeholder="Your message" required />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#1C398E] hover:bg-[#152b6a] text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {status === "loading" ? "Sending..." : "Get Detailed Quotation"}
        </button>

        {/* Success or error message */}
        {status === "success" && (
          <p className="text-green-600 text-center mt-3">
            Thank you! Your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-3">
            Oops! Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E] focus:border-[#1C398E]"
    />
  </div>
);

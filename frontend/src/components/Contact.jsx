import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { toast } from "react-toastify";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [loader, setLoader] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_URL}/contact/send`, form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message");
    }
    finally {
      setLoader(false);
    }
  };

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    gsap.fromTo(
      left,
      { x: -150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: left,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      right,
      { x: 150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: right,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] px-6 py-20 font-[Inter] overflow-hidden">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl md:text-6xl font-[Playfair_Display] text-gray-900 mb-6 tracking-tight">
          Let’s <span className="text-red-600">Connect</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Whether you have a question about your order, need styling advice, or
          just want to say hello — we’d love to hear from you.
        </p>
      </div>

      {/* Contact Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
        {/* Left Section */}
        <div
          ref={leftRef}
          className="bg-gradient-to-br from-black via-gray-900 to-red-800 text-white p-12 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-3xl font-[Playfair_Display] mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Reach us anytime — our dedicated team ensures your satisfaction is
              always top priority.
            </p>

            <ul className="space-y-6 text-gray-300">
              <li>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">
                  Phone
                </p>
                <p className="text-lg font-light">+91 62826 12177</p>
                <p className="text-lg font-light">+91 85901 23072</p>
              </li>

              <li>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">
                  Email
                </p>
                <p className="text-lg font-light">support@VestidoClub.com</p>
              </li>

              <li>
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">
                  Address
                </p>
                <p className="text-lg font-light">New Delhi, India</p>
              </li>
            </ul>
          </div>

          <div className="mt-12 text-gray-400 text-xs">
            © {new Date().getFullYear()} Vestido Club. All Rights Reserved.
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div ref={rightRef} className="p-12 bg-white">
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-gray-300 bg-gray-50 p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-300 bg-gray-50 p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Let us know how we can help"
                value={form.subject}
                onChange={handleChange}
                className="border border-gray-300 bg-gray-50 p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="border border-gray-300 bg-gray-50 p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loader}
              className={`w-full py-4 text-white font-semibold rounded-lg text-lg transition transform 
    ${loader ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-600 to-black hover:scale-[1.02] hover:shadow-xl"}
  `}
            >
              {loader ? (
                <div className="flex justify-center items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

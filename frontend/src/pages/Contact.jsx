import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mt-7 mb-12">
        {/* <h2 className="text-4xl font-bold text-black mb-3">Get In Touch</h2> */}
        <p className="text-gray-600 max-w-2xl mx-auto">
           Discover the perfect outfit for every occasion. From trendy streetwear to
  elegant formals, we bring you the latest styles with the finest quality.
  Have questions about your order or need styling assistance? Our team is here
  to help you look and feel your best.
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        {/* Left Info Box */}
        <div className="bg-red-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-3">Contact Information</h3>
            <p className="text-red-100 mb-6">
              Reach out to us anytime — we’re always ready to help with your
              project or inquiry.
            </p>

            <ul className="space-y-4">
              <li>
                <span className="block font-semibold">Phone</span>
                <p className="text-red-100">+91 6282612177</p>
                <p className="text-red-100">+91 8590123072</p>
              </li>
              <li>
                <span className="block font-semibold">Email</span>
                <p className="text-red-100">support@bonkerscorner.com</p>
              </li>
              <li>
                <span className="block font-semibold">Address</span>
                <p className="text-red-100">New Delhi, India</p>
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <p className="text-sm text-red-100">
              © {new Date().getFullYear()} bonkerscorner. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="p-10 bg-white">
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray-300 w-full p-3 rounded-md focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 w-full p-3 rounded-md focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter your subject"
                className="border border-gray-300 w-full p-3 rounded-md focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message"
                className="border border-gray-300 w-full p-3 rounded-md focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-black text-white font-semibold py-3 px-6 rounded-md transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrums.jsx';
import Marquee from '../components/Marquee.jsx';

const Contact = () => {
  return (
    <div className="flex flex-col mt-[80px] w-full absolute">
      {/* Breadcrumb */}
      <div className="pl-10 w-full">
        <Breadcrumb Home="Home" Contact="Contact" />
      </div>

      {/* Marquee */}
      <Marquee />

      {/* Contact Section */}
      <motion.section
        className="w-full flex flex-col items-center justify-center py-12 px-4 md:px-8 lg:px-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have any questions or feedback? Fill out the form below and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <motion.form
          className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-medium py-3 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          className="mt-12 text-center space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-gray-700">📧 support@example.com</p>
          <p className="text-gray-700">📞 +1 234 567 890</p>
          <p className="text-gray-700">🏢 1234 Main Street, City, Country</p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Contact;

import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const NotFound = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);

  useEffect(() => {
    // Slide + bounce when entering
    gsap.fromTo(
      headingRef.current,
      { y: -200, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.7)',
      }
    );

    // Continuous pulse effect
    gsap.to(headingRef.current, {
      scale: 1.05,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: 1.5,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 overflow-hidden">
      {/* Big 404 */}
      <h1
        ref={headingRef}
        className="text-9xl font-extrabold text-red-600 select-none"
      >
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 mt-2 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="bg-red-600 text-white px-6 py-3 rounded-md shadow hover:bg-red-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;

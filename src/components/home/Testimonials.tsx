"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      role: "Co-Founder at XYZ",
      feedback: "This platform helped me find amazing events near me!",
      image: "/images/testimonial.png",
    },
    {
      name: "Mark Smith",
      role: "Manager at ABC Corp",
      feedback: "Organizing my event was so easy with this website.",
      image: "/images/testimonial2.png",
    },
    {
      name: "Sophia Lee",
      role: "Event Coordinator at DEF",
      feedback: "A great way to discover local events and meet new people!",
      image: "/images/testimonial3.png",
    },
  ];

  return (
    <section className="py-14 bg-gray-100">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-teal-700"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        TESTIMONIALS
      </motion.h2>
      <p className="text-center text-gray-600 mt-2">
        See what our users are saying about us!
      </p>

      {/* Review Cards */}
      <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-xl shadow-lg text-center border border-gray-200 
                       hover:shadow-xl transition-transform duration-300 hover:scale-[1.03]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Profile Image */}
            <div className="flex justify-center -mt-14">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-teal-600 shadow-md">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quote */}
            <p className="italic text-gray-700 mt-4 px-4 relative">
              <FaQuoteLeft className="absolute left-0 top-0 text-teal-500 text-xl" />
              {review.feedback}
              <FaQuoteRight className="absolute right-0 bottom-0 text-teal-500 text-xl" />
            </p>

            {/* Name & Role */}
            <h3 className="mt-4 font-bold text-lg text-teal-700">{review.name}</h3>
            <p className="text-gray-500 text-sm">{review.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

"use client";

import { motion } from "framer-motion";

const NewsUpdates = () => {
  const updates = [
    { title: "🎶 Music Festival Coming Soon!", date: "Feb 28, 2025" },
    { title: "🎉 New Year Celebrations", date: "Dec 31, 2024" },
    { title: "🏆 Community Awards Night", date: "Apr 15, 2025" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title with Animation */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-8 tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Updates
        </motion.h2>

        {/* News Cards */}
        <ul className="space-y-6">
          {updates.map((update, index) => (
            <motion.li
              key={index}
              className="bg-white/90 backdrop-blur-lg p-5 md:p-6 rounded-xl shadow-lg border border-gray-200 
                         hover:shadow-teal-500/40 transform transition-all duration-300 hover:scale-[1.02] 
                         text-left flex flex-col md:flex-row md:items-center md:justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg md:text-2xl font-semibold text-gray-800">{update.title}</h3>
              <p className="text-gray-600 mt-2 md:mt-0 text-sm md:text-base">{update.date}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewsUpdates;

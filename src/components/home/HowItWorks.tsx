"use client";

import { motion } from "framer-motion";
import { FaSearch, FaCalendarCheck, FaUsers } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-teal-500 text-5xl drop-shadow-lg" />,
      title: "Discover Events",
      description: "Find exciting events happening around you with our easy-to-use search.",
    },
    {
      icon: <FaCalendarCheck className="text-teal-500 text-5xl drop-shadow-lg" />,
      title: "Register or RSVP",
      description: "Sign up and RSVP for events you’d love to attend.",
    },
    {
      icon: <FaUsers className="text-teal-500 text-5xl drop-shadow-lg" />,
      title: "Connect with Community",
      description: "Engage with event organizers and like-minded attendees.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl font-extrabold text-teal-700 mb-10 tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-md shadow-xl p-8 rounded-2xl border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-teal-500/50"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-2xl font-bold mt-6 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-3">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

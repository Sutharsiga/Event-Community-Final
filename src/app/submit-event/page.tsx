"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SubmitEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("🎉 Event submitted successfully!");
    setFormData({ title: "", date: "", location: "", image: "" }); // Reset form
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header /> {/* ✅ Added Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center items-center py-12"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-teal-700">Submit a New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL (Optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={formData.image}
              onChange={handleChange}
            />
            <button type="submit" className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800 transition">
              Add Event
            </button>
          </form>
        </div>
      </motion.div>
      <Footer /> {/* ✅ Added Footer */}
    </div>
  );
};

export default SubmitEvent;

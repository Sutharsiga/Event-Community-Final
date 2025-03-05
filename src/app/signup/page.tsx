"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Signup = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Signup successful! (Mock)");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header /> {/* ✅ Added Header */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center items-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg pr-10"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800">
            Sign Up
          </button>
        </form>

        {/* Google Signup */}
        <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100">
          <FaGoogle className="text-red-500" />
          <span>Sign Up with Google</span>
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 font-semibold">Login</Link>
        </p>
      </div>
    </motion.div>
    <Footer /> {/* ✅ Added Footer */}
    </div>
  );
};

export default Signup;

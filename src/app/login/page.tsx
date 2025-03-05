"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login successful! (Mock)");
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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>
        
        {/* Google Login */}
        <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100">
          <FaGoogle className="text-red-500" />
          <span>Login with Google</span>
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-teal-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </motion.div>
    <Footer /> {/* ✅ Added Footer */}
    </div>
  );
};

export default Login;

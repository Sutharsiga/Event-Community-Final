"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaSignOutAlt, FaArrowLeft, FaCog, FaSave, FaEdit } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Profile = () => {
  const router = useRouter();
  
  // Initial User Data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "January 2024",
    profilePic: "/images/profile.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState(user);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  // Handle Profile Picture Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setNewUserData({ ...newUserData, profilePic: imageUrl });
    }
  };

  // Save Changes
  const saveChanges = () => {
    setUser(newUserData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-grow justify-center items-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md text-center relative">
          
          {/* 🔙 Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            <FaArrowLeft className="text-gray-600" size={18} />
          </button>

          {/* ⚙ Settings Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            {isEditing ? <FaSave className="text-green-600" /> : <FaCog className="text-gray-600" />}
          </button>

          {/* Profile Picture */}
          <div className="flex justify-center relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-teal-500 shadow-md">
              <Image
                src={user.profilePic}
                alt="Profile Picture"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-300">
                <FaEdit className="text-gray-600" />
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* User Details */}
          {isEditing ? (
            <div className="mt-4">
              <input
                type="text"
                name="name"
                value={newUserData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={saveChanges}
                className="mt-4 w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mt-4">{user.name}</h2>
              <p className="text-gray-600 text-lg flex items-center justify-center">
                <FaEnvelope className="text-teal-600 mr-2" />
                {user.email}
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-gray-700">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-teal-600" />
                  <span className="text-gray-700">Joined: {user.joined}</span>
                </div>
              </div>
            </>
          )}

          {/* Logout Button */}
          <button className="mt-6 w-full bg-red-500 text-white py-3 rounded-full flex items-center justify-center space-x-2 text-lg font-semibold hover:bg-red-600 transition">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

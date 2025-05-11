// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { supabase } from "@/utils/supabaseClient";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const Signup = () => {
//   const [userData, setUserData] = useState({ name: "", email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const { email, password, name } = userData;

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { name, role: "client" },
//       },
//     });

//     setLoading(false);

//     if (error) {
//       alert(`Signup failed: ${error.message}`);
//     } else {
//       alert("Signup successful! Check your email to verify.");
//       router.push("/login");
//     }
//   };

//   const handleGoogleSignup = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

//     if (error) {
//       alert(`Google Signup failed: ${error.message}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         transition={{ duration: 0.4 }}
//         className="flex justify-center items-center min-h-screen bg-gray-100"
//       >
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               onChange={handleChange}
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 className="w-full p-3 border border-gray-300 rounded-lg pr-10"
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800"
//               disabled={loading}
//             >
//               {loading ? "Signing Up..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Google Signup */}
//           <button
//             onClick={handleGoogleSignup}
//             className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100"
//           >
//             <FaGoogle className="text-red-500" />
//             <span>Sign Up with Google</span>
//           </button>

//           <p className="text-center text-gray-600 mt-4">
//             Already have an account?{" "}
//             <Link href="/login" className="text-teal-600 font-semibold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//       <Footer />
//     </div>
//   );
// };

// export default Signup;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { supabase } from "@/utils/supabaseClient";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const Signup = () => {
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "customer", // Default role
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const { email, password, name, role } = userData;

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { name, role }, // Store name and role in user_metadata
//       },
//     });

//     setLoading(false);

//     if (error) {
//       alert(`Signup failed: ${error.message}`);
//     } else {
//       alert("Signup successful! Check your email to verify.");
//       router.push("/login");
//     }
//   };

//   const handleGoogleSignup = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

//     if (error) {
//       alert(`Google Signup failed: ${error.message}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         transition={{ duration: 0.4 }}
//         className="flex justify-center items-center min-h-screen bg-gray-100"
//       >
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               onChange={handleChange}
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 className="w-full p-3 border border-gray-300 rounded-lg pr-10"
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Role Dropdown */}
//             <select
//               name="role"
//               value={userData.role}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               required
//             >
//               <option value="customer">Customer</option>
//               <option value="organizer">Organizer</option>
//               <option value="admin">Admin</option>
//             </select>

//             <button
//               type="submit"
//               className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800"
//               disabled={loading}
//             >
//               {loading ? "Signing Up..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Google Signup */}
//           {userData.role !== "admin" && userData.role !== "organizer" && (
//             <button
//             onClick={handleGoogleSignup}
//             className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100"
//           >
//             <FaGoogle className="text-red-500" />
//             <span>Sign Up with Google</span>
//           </button>
//           )}
          

//           <p className="text-center text-gray-600 mt-4">
//             Already have an account?{" "}
//             <Link href="/login" className="text-teal-600 font-semibold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//       <Footer />
//     </div>
//   );
// };

// export default Signup;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, role } = userData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(`Signup failed: ${error.message}`);
    } else {
      alert("Signup successful! Check your email to verify.");
      router.push("/login");
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      alert(`Google signup failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
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

            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="customer">Customer</option>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Google Sign Up */}
          {userData.role !== "admin" && userData.role !== "organizer" && (
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100"
            >
              <FaGoogle className="text-red-500" />
              <span>Sign Up with Google</span>
            </button>
          )}

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Signup;


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { supabase } from "@/utils/supabaseClient";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error } = await supabase.auth.signInWithPassword({ email, password });

//     setLoading(false);

//     if (error) {
//       alert(`Login failed: ${error.message}`);
//     } else {
//       alert("Login successful!");
//       router.push("/dashboard"); // Redirect to dashboard
//     }
//   };

//   const handleGoogleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

//     if (error) {
//       alert(`Google Login failed: ${error.message}`);
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
//         className="flex justify-center items-center min-h-screen"
//       >
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full p-3 border border-gray-300 rounded-lg pr-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
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
//             <button type="submit" className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800">
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           {/* Google Login */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100"
//           >
//             <FaGoogle className="text-red-500" />
//             <span>Login with Google</span>
//           </button>

//           <p className="text-center text-gray-600 mt-4">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-teal-600 font-semibold">Sign Up</Link>
//           </p>
//         </div>
//       </motion.div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { supabase } from "@/utils/supabaseClient";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const {
//       data: { user },
//       error,
//     } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       setLoading(false);
//       alert(`Login failed: ${error.message}`);
//       return;
//     }

//     if (!user) {
//       setLoading(false);
//       alert("Login failed: No user found.");
//       return;
//     }

//     // ✅ Fetch user profile to get role
//     const { data: profile, error: profileError } = await supabase
//       .from("profiles")
//       .select("role")
//       .eq("id", user.id)
//       .single();

//     setLoading(false);

//     if (profileError || !profile) {
//       alert("Unable to fetch user role.");
//       return;
//     }

//     const userRole = profile.role;

//     // ✅ Redirect based on role
//     if (userRole === "admin") {
//       router.push("/admin");
//     } else if (userRole === "organizer") {
//       router.push("/organizer");
//     } else {
//       // customer just stays on the public site or go to profile
//       router.push("/profile");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

//     if (error) {
//       alert(`Google Login failed: ${error.message}`);
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
//         className="flex justify-center items-center min-h-screen"
//       >
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full p-3 border border-gray-300 rounded-lg pr-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
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
//             <button type="submit" className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800">
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100"
//           >
//             <FaGoogle className="text-red-500" />
//             <span>Login with Google</span>
//           </button>

//           <p className="text-center text-gray-600 mt-4">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-teal-600 font-semibold">Sign Up</Link>
//           </p>
//         </div>
//       </motion.div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      alert(`Login failed: ${error.message}`);
      return;
    }

    if (!user) {
      setLoading(false);
      alert("Login failed: No user found.");
      return;
    }

    // ✅ Fetch user role from 'profiles' table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setLoading(false);

    if (profileError || !profile?.role) {
      alert("Unable to fetch user role. Please try again.");
      return;
    }

    const userRole = profile.role;

    // ✅ Role-based redirect
    switch (userRole) {
      case "admin":
        router.push("/admin");
        break;
      case "organizer":
        router.push("/organizer");
        break;
      default:
        router.push("/profile");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      alert(`Google Login failed: ${error.message}`);
    }
    // Supabase will handle the redirect automatically
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center items-center min-h-screen"
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
            <button
              type="submit"
              className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 p-3 rounded-lg mt-4 hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500" />
            <span>Login with Google</span>
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-teal-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Login;

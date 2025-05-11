// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-white shadow-md py-4 px-10 flex justify-between items-center">
//       {/* Logo Section */}
//       <div className="flex items-center">
//         <Image src="/logo.png" alt="Logo" width={40} height={40} />
//       </div>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
//         <Link href="/" className="hover:text-gray-500">Home</Link>
//         <Link href="/events" className="hover:text-gray-500">Events</Link>
//         <Link href="/submit-event" className="hover:text-gray-500">Submit Events</Link>
//         <Link href="/profile" className="hover:text-gray-500">My Profile</Link>
//       </nav>

//       {/* Login & Sign Up Buttons */}
//       <div className="hidden md:flex items-center space-x-4">
//       <Link href="/login" className="border-2 border-gray-600 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100">
//             Login
//           </Link>
//           <Link href="/signup" className="bg-teal-700 text-white px-5 py-2 rounded-full hover:bg-teal-800">
//             Sign Up
//           </Link>
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden text-gray-700"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//       </button>

//       {/* Mobile Menu Drawer */}
//       {menuOpen && (
//         <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden">
//           <Link href="/" className="text-lg font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
//           <Link href="/events" className="text-lg font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Events</Link>
//           <Link href="/submit-event" className="text-lg font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Submit Events</Link>
//           <Link href="/profile" className="text-lg font-medium text-gray-700" onClick={() => setMenuOpen(false)}>My Profile</Link>
//           <Link href="/login" className="border-2 border-gray-600 px-4 py-2 rounded-full text-gray-700" onClick={() => setMenuOpen(false)}>
//             Login
//           </Link>
//           <Link href="/signup" className="bg-teal-700 text-white px-5 py-2 rounded-full" onClick={() => setMenuOpen(false)}>
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const goToDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const role = user?.user_metadata?.role;

    if (role === "admin") router.push("/admin");
    else if (role === "organizer") router.push("/organizer");
    else router.push("/profile");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const NavLinks = () => (
    <>
      <Link href="/" onClick={() => setMenuOpen(false)}>
        Home
      </Link>
      <Link href="/events" onClick={() => setMenuOpen(false)}>
        Events
      </Link>
      <Link href="/submit-event" onClick={() => setMenuOpen(false)}>
        Submit Events
      </Link>
      <Link href="/profile" onClick={() => setMenuOpen(false)}>
        My Profile
      </Link>
      {user ? (
        <>
          <button
            onClick={goToDashboard}
            className="text-teal-700 font-semibold"
          >
            Dashboard
          </button>
          <button onClick={handleLogout} className="text-red-500 font-semibold">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link href="/signup" onClick={() => setMenuOpen(false)}>
            Sign Up
          </Link>
        </>
      )}
    </>
  );

  return (
    // <header className="bg-white shadow-md py-4 px-10 flex justify-between items-center">
    //   <div className="flex items-center">
    //     <Image src="/logo.png" alt="Logo" width={40} height={40} />
    //   </div>

    //   <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
    //     <NavLinks />
    //   </nav>

    //   <div className="md:hidden">
    //     <button onClick={() => setMenuOpen(!menuOpen)}>
    //       {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    //     </button>
    //   </div>

    //   {menuOpen && (
    //     <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden z-50">
    //       <NavLinks />
    //     </div>
    //   )}
    // </header>
    <header className="bg-white shadow-md py-4 px-10 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
        <Link href="/" className="hover:text-gray-500">
          Home
        </Link>
        <Link href="/events" className="hover:text-gray-500">
          Events
        </Link>
        <Link href="/submit-event" className="hover:text-gray-500">
          Submit Events
        </Link>
        <Link href="/profile" className="hover:text-gray-500">
          My Profile
        </Link>
      </nav>

      {/* Login & Sign Up Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          href="/login"
          className="border-2 border-gray-600 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-teal-700 text-white px-5 py-2 rounded-full hover:bg-teal-800"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden">
          <Link
            href="/"
            className="text-lg font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-lg font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/submit-event"
            className="text-lg font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Submit Events
          </Link>
          <Link
            href="/profile"
            className="text-lg font-medium text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            My Profile
          </Link>
          <Link
            href="/login"
            className="border-2 border-gray-600 px-4 py-2 rounded-full text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-teal-700 text-white px-5 py-2 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

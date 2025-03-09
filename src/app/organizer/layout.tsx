"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaSignOutAlt, FaHome, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white w-64 p-5 transition-all ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-2xl font-bold mb-6">Organizer Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/organizer">
                <span className={`flex items-center p-3 rounded-lg ${pathname === "/organizer" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaHome className="mr-2" /> Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link href="/organizer/myevents">
                <span className={`flex items-center p-3 rounded-lg ${pathname === "/organizer/myevents" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaCalendarAlt className="mr-2" /> My Events
                </span>
              </Link>
            </li>
            <li>
              <Link href="/organizer/createevent">
                <span className={`flex items-center p-3 rounded-lg ${pathname === "/organizer/createevent" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <IoMdAddCircle className="mr-2" /> Create Event
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/organizer/eventanalytics"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/organizer/eventanalytics" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <AiOutlineBarChart className="mr-2" /> Event Analytics
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/organizer/userengagement"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/organizer/userengagement" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaUsers className="mr-2" /> User Engagement
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/organizer/organizernotification"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/organizer/organizernotification" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <IoMdNotifications className="mr-2" /> Notifications
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button className="md:hidden text-gray-700" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-bold">Organizer Dashboard</h1>
          <button className="text-red-600 hover:text-red-800 flex items-center">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default OrganizerLayout;

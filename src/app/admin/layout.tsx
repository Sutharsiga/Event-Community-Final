"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaSignOutAlt, FaHome, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white w-64 p-5 transition-all ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin">
                <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaHome className="mr-2" /> Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/events">
                <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/events" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaCalendarAlt className="mr-2" /> Event Management
                </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/users" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaUsers className="mr-2" /> User Management
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/admin/eventapprovals"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/eventapprovals" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaCheckCircle className="mr-2" /> Event Approvals
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/admin/locationmanagement"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/locationmanagement" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <FaLocationDot className="mr-2" /> Location Management
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/admin/duplicateevents"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/duplicateevents" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <MdContentCopy className="mr-2" /> Event Detection
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/admin/adminnotifications"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/adminnotifications" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <IoMdNotifications className="mr-2" /> Notifications
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/admin/reports"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/reports" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <AiOutlineBarChart className="mr-2" /> Reports & Analytics
                </span>
              </Link>
            </li>
            <li>
              <Link href={"/admin/systemsettings"}>
              <span className={`flex items-center p-3 rounded-lg ${pathname === "/admin/systemsettings" ? "bg-teal-600" : "hover:bg-gray-700"}`}>
                  <IoSettingsSharp className="mr-2" /> System Settings
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
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
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

export default AdminLayout;

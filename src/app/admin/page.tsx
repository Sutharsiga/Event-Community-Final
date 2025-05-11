"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

//Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardCheck,
  FaBell,
  FaCheckCircle,
  FaUserCog,
  FaChartBar,
  FaHistory,
} from "react-icons/fa";

const dashboardStats = [
  {
    id: 1,
    name: "Total Users",
    count: 250,
    icon: <FaUsers className="text-blue-500 text-3xl" />,
  },
  {
    id: 2,
    name: "Total Events",
    count: 120,
    icon: <FaCalendarAlt className="text-green-500 text-3xl" />,
  },
  {
    id: 3,
    name: "Pending Approvals",
    count: 10,
    icon: <FaClipboardCheck className="text-yellow-500 text-3xl" />,
  },
  {
    id: 4,
    name: "New Notifications",
    count: 5,
    icon: <FaBell className="text-red-500 text-3xl" />,
  },
];

const quickLinks = [
  {
    id: 1,
    name: "Approve Events",
    icon: <FaCheckCircle />,
    href: "/admin/eventapprovals",
  },
  { id: 2, name: "Manage Users", icon: <FaUserCog />, href: "/admin/users" },
  { id: 3, name: "View Reports", icon: <FaChartBar />, href: "/admin/reports" },
];

const recentActivities = [
  {
    id: 1,
    message: "John Doe created an event 'Tech Conference 2025'",
    time: "2 hours ago",
  },
  {
    id: 2,
    message: "Admin approved event 'Startup Meetup'",
    time: "5 hours ago",
  },
  { id: 3, message: "New user 'Jane Smith' registered", time: "1 day ago" },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          throw error;
        }
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const promoteToAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ role: "admin" })
        .eq("id", userId);

      if (error) throw error;

      alert("User promoted to admin!");
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: "admin" } : user
        )
      );
    } catch (err) {
      alert("Failed to promote user to admin");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <div className="admin-dashboard">
    //   <h1>Admin Dashboard</h1>
    //   <div className="admin-user-list">
    //     <h2>All Users</h2>
    //     {users.map((user) => (
    //       <div key={user.id} className="user-item">
    //         <p>{user.name} - {user.role}</p>
    //         {user.role !== "admin" && (
    //           <button onClick={() => promoteToAdmin(user.id)}>Promote to Admin</button>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="p-5">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            {stat.icon}
            <div>
              <h3 className="text-lg font-semibold">{stat.name}</h3>
              <p className="text-xl font-bold">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center gap-3 hover:bg-blue-200 transition"
            >
              {link.icon}
              <span className="font-semibold">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="border-b last:border-none py-3 flex items-center gap-3"
            >
              <FaHistory className="text-gray-500" />
              <div>
                <p className="text-gray-700">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

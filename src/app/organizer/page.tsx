"use client";

import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const eventStats = {
  total: 50,
  approved: 30,
  pending: 15,
  rejected: 5,
};

const recentEvents = [
  { name: "Wedding", attendees: 200, rating: 4.5 },
  { name: "Key Birthday", attendees: 150, rating: 4.2 },
  { name: "Engadgement", attendees: 100, rating: 4.0 },
  { name: "Baby Shower", attendees: 120, rating: 4.3 },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold mb-4">Organizer Dashboard</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-md flex flex-col items-center">
          <h2 className="text-lg font-semibold">Total Events</h2>
          <p className="text-2xl font-bold text-blue-500">{eventStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md flex flex-col items-center">
          <h2 className="text-lg font-semibold">Approved Events</h2>
          <p className="text-2xl font-bold text-green-500">{eventStats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md flex flex-col items-center">
          <h2 className="text-lg font-semibold">Pending Events</h2>
          <p className="text-2xl font-bold text-yellow-500">{eventStats.pending}</p>
        </div>
      </div>

      {/* Recent Event Performance Chart */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-3">Recent Event Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={recentEvents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attendees" fill="#3182CE" name="Attendees" />
            <Bar dataKey="rating" fill="#63B3ED" name="Ratings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

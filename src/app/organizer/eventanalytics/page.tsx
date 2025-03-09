"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const eventAnalyticsData = [
  { name: "Event A", views: 500, likes: 120, shares: 45 },
  { name: "Event B", views: 700, likes: 180, shares: 80 },
  { name: "Event C", views: 450, likes: 90, shares: 30 },
  { name: "Event D", views: 800, likes: 200, shares: 100 },
];

export default function EventAnalytics() {
  return (
    <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Event Analytics</h1>

        {/* Event Performance Chart */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Event Engagement (Views, Likes, Shares)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3182CE" name="Views" />
              <Bar dataKey="likes" fill="#34D399" name="Likes" />
              <Bar dataKey="shares" fill="#FBBF24" name="Shares" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Summary */}
        <div>
          <h2 className="text-lg font-semibold mb-3">User Engagement Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <p className="text-xl font-bold">{eventAnalyticsData.reduce((acc, event) => acc + event.views, 0)}</p>
              <p className="text-gray-600">Total Views</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-xl font-bold">{eventAnalyticsData.reduce((acc, event) => acc + event.likes, 0)}</p>
              <p className="text-gray-600">Total Likes</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-xl font-bold">{eventAnalyticsData.reduce((acc, event) => acc + event.shares, 0)}</p>
              <p className="text-gray-600">Total Shares</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

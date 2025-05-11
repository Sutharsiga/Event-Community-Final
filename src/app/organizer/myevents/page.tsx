"use client";

import { useState } from "react";

const sampleEvents = [
  { id: 1, name: "Wedding", date: "2025-03-15", status: "Approved" },
  { id: 2, name: "Key Birthday", date: "2025-04-10", status: "Pending" },
  { id: 3, name: "Engadgement", date: "2025-05-05", status: "Rejected" },
  { id: 4, name: "Baby Shower", date: "2025-06-20", status: "Approved" },
];

export default function MyEvents() {
  const [events, setEvents] = useState(sampleEvents);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter and search logic
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || event.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Delete event
  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };
  return (
    <>
      <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">My Events</h1>

        {/* Search & Filter */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-1/3"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Events Table */}
        <div className="overflow-hidden">
          <table className="w-full border-collapse border text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border text-left">Event Name</th>
                <th className="p-3 border text-left">Date</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 border">{event.name}</td>
                  <td className="p-3 border">{event.date}</td>
                  <td
                    className={`p-3 border font-semibold ${
                      event.status === "Approved"
                        ? "text-green-500"
                        : event.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {event.status}
                  </td>
                  <td className="p-3 border">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-3 border text-center text-gray-500">
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

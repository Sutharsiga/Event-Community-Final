"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";

// ✅ Supabase Initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AdminEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch Events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        setError("Failed to fetch events.");
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  // ✅ Delete Event Function
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      alert("Failed to delete event.");
    } else {
      setEvents(events.filter((event) => event.id !== id)); // Remove from UI
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">📅 Manage Events</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Title</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Location</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border text-center">
                <td className="border p-3">{event.title}</td>
                <td className="border p-3">{event.date}</td>
                <td className="border p-3">{event.location}</td>
                <td className="border p-3 flex justify-center gap-4">
                  <Link href={`/admin/events/edit/${event.id}`} className="text-blue-600 hover:underline flex items-center">
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                  <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:underline flex items-center">
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link href="/admin/events/add" className="mt-6 block text-center text-white bg-teal-700 py-2 px-4 rounded-lg hover:bg-teal-800">
        ➕ Add New Event
      </Link>
    </div>
  );
};

export default AdminEvents;

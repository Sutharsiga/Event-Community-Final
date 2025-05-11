"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

//Supabase Initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AdminEvents = () => {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Events from Supabase
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

  // Delete Event Function
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
                  <Link
                    href={`/admin/events/edit/${event.id}`}
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:underline flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link
        href="/admin/events/add"
        className="mt-6 text-center flex items-center justify-center text-white bg-teal-700 py-2 px-4 rounded-lg hover:bg-teal-800"
      >
        <div className="flex items-center gap-2">
          <FaPlus />
          Add New Event
        </div>
      </Link>
    </div>
  );
};

export default AdminEvents;

// "use client";

// import { useState } from "react";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// const eventData = [
//   { id: 1, name: "Tech Conference 2025", organizer: "John Doe", date: "2025-06-10", status: "Approved" },
//   { id: 2, name: "Startup Meetup", organizer: "Jane Smith", date: "2025-07-15", status: "Pending" },
//   { id: 3, name: "Music Festival", organizer: "Alice Brown", date: "2025-08-20", status: "Rejected" },
// ];

// export default function EventManagement() {
//   const [search, setSearch] = useState("");
//   const [filteredEvents, setFilteredEvents] = useState(eventData);

//   // Handle search input
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//     const filtered = eventData.filter((event) =>
//       event.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredEvents(filtered);
//   };

//   function setFilter(value: string): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold mb-6">Event Management</h1>

//       {/* Search & Filter */}
//       <div className="flex flex-col md:flex-row gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           className="p-2 border rounded w-full md:w-1/2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//             onChange={(e) => setFilter(e.target.value)}
//             className="p-2  border rounded"
//           >
//             <option value="All">All</option>
//             <option value="Active">Active</option>
//             <option value="Pending">Pending</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//       </div>

//       {/* Event List Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border text-left">Event Name</th>
//               <th className="p-3 border text-left">Organizer</th>
//               <th className="p-3 border text-left">Date</th>
//               <th className="p-3 border text-left">Status</th>
//               <th className="p-3 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEvents.length > 0 ? (
//               filteredEvents.map((event) => (
//                 <tr key={event.id} className="border-t">
//                   <td className="p-3 border">{event.name}</td>
//                   <td className="p-3 border">{event.organizer}</td>
//                   <td className="p-3 border">{event.date}</td>
//                   <td className="p-3 border">
//                     <span
//                       className={`px-2 py-1 text-sm font-semibold rounded
//                         ${event.status === "Approved" ? "bg-green-200 text-green-700" : ""}
//                         ${event.status === "Pending" ? "bg-yellow-200 text-yellow-700" : ""}
//                         ${event.status === "Rejected" ? "bg-red-200 text-red-700" : ""}`}
//                     >
//                       {event.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center flex justify-center gap-3">
//                     <button className="text-blue-500 hover:text-blue-700">
//                       <FaEdit />
//                     </button>
//                     <button className="text-red-500 hover:text-red-700">
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="p-3 text-center text-gray-500">
//                   No events found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

const duplicateEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    organizer: "John Doe",
    date: "March 15, 2025",
    location: "New York, USA",
    description: "A conference about the latest trends in technology.",
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    organizer: "John Doe",
    date: "March 15, 2025",
    location: "New York, USA",
    description: "An event discussing new advancements in AI and ML.",
  },
];

export default function DuplicateEvents() {
  const [events, setEvents] = useState(duplicateEvents);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  const toggleSelectEvent = (id: number) => {
    setSelectedEvents((prev) =>
      prev.includes(id)
        ? prev.filter((eventId) => eventId !== id)
        : [...prev, id]
    );
  };

  const handleMerge = () => {
    if (selectedEvents.length < 2) {
      alert("Select at least two events to merge.");
      return;
    }

    const mergedEvent = {
      id: Math.max(...selectedEvents) + 1,
      title: "Merged Event",
      organizer: "Multiple Organizers",
      date: "TBD",
      location: "TBD",
      description: "Merged event combining details from duplicates.",
    };

    setEvents((prev: any[]) => [
      ...prev.filter(
        (event: { id: any }) => !selectedEvents.includes(event.id)
      ),
      mergedEvent,
    ]);
    setSelectedEvents([]);
    alert("Events merged successfully!");
  };

  const handleRemove = () => {
    setEvents(
      events.filter((event: { id: any }) => !selectedEvents.includes(event.id))
    );
    setSelectedEvents([]);
    alert("Duplicate events removed!");
  };

  return (
    <>
      <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Duplicate Event Detection</h1>

        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">Select</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Organizer</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border">
                  <td className="p-3 border text-center">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => toggleSelectEvent(event.id)}
                    />
                  </td>
                  <td className="p-3 border">{event.title}</td>
                  <td className="p-3 border">{event.organizer}</td>
                  <td className="p-3 border">{event.date}</td>
                  <td className="p-3 border">{event.location}</td>
                  <td className="p-3 border">{event.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Actions */}
          <div className="p-4 bg-gray-100 border-t flex items-end justify-end gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleMerge}
              disabled={selectedEvents.length < 2}
            >
              Merge Selected
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleRemove}
              disabled={selectedEvents.length === 0}
            >
              Remove Selected
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

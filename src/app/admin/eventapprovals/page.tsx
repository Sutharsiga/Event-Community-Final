"use client";
import { useState } from "react";

const pendingEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    organizer: "John Doe",
    date: "March 15, 2025",
    location: "New York, USA",
    description: "A conference about the latest trends in technology.",
    status: "Pending",
  },
  {
    id: 2,
    title: "Wedding Function",
    organizer: "Jane Smith",
    date: "April 10, 2025",
    location: "Los Angeles, USA",
    description: "Showcasing modern and contemporary art pieces.",
    status: "Pending",
  },
  // {
  //   id: 3,
  //   title: "Birthday party",
  //   organizer: "John Mathew",
  //   date: "May 10, 2025",
  //   location: "Los Angeles, USA",
  //   description: "3 Year old baby birthday celebration",
  //   status: "Pending",
  // },
];

export default function EventApprovals() {
  const [events, setEvents] = useState(pendingEvents);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [rejectionReasons, setRejectionReasons] = useState<{
    [key: number]: string;
  }>({});

  const handleApprove = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    alert(`Event ${id} approved!`);
  };

  const handleReject = (id: number) => {
    if (!rejectionReasons[id]) {
      alert("Please provide a reason for rejection.");
      return;
    }
    setEvents(events.filter((event) => event.id !== id));
    alert(`Event ${id} rejected for reason: ${rejectionReasons[id]}`);
  };

  return (
    <>
      <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Event Approvals</h1>

        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Organizer</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border">
                  <td className="p-3 border">{event.title}</td>
                  <td className="p-3 border">{event.organizer}</td>
                  <td className="p-3 border">{event.date}</td>
                  <td className="p-3 border">{event.location}</td>
                  <td className="p-3 border">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleApprove(event.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        setExpandedEvent(
                          expandedEvent === event.id ? null : event.id
                        )
                      }
                    >
                      {expandedEvent === event.id ? "Close" : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Event Details & Rejection Reason */}
          {expandedEvent && (
            <div className="p-4 bg-gray-100 border-t">
              <h2 className="text-lg font-semibold">Event Details</h2>
              <p>
                <strong>Title:</strong>{" "}
                {events.find((event) => event.id === expandedEvent)?.title}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {
                  events.find((event) => event.id === expandedEvent)
                    ?.description
                }
              </p>

              <textarea
                className="w-full p-2 mt-3 border rounded"
                placeholder="Enter rejection reason..."
                onChange={(e) =>
                  setRejectionReasons({
                    ...rejectionReasons,
                    [expandedEvent]: e.target.value,
                  })
                }
              ></textarea>

              <button
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleReject(expandedEvent)}
              >
                Confirm Rejection
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

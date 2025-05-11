"use client";

import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const sampleNotifications = [
  {
    id: 1,
    type: "approval",
    message: "Your event 'Wedding 2025' has been approved!",
    read: false,
  },
  {
    id: 2,
    type: "rejection",
    message: "Your event 'Baby Shower' was rejected. Check the reason.",
    read: false,
  },
  {
    id: 3,
    type: "reminder",
    message: "Reminder: 'Engadgement' is happening in 2 days.",
    read: false,
  },
];

export default function OrganizerNotifications() {
  const [notifications, setNotifications] = useState(sampleNotifications);

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-md shadow-md flex items-center justify-between 
              ${notif.type === "approval" ? "bg-green-100 border-l-4 border-green-500" : ""}
              ${notif.type === "rejection" ? "bg-red-100 border-l-4 border-red-500" : ""}
              ${notif.type === "reminder" ? "bg-blue-100 border-l-4 border-blue-500" : ""}
              ${notif.read ? "opacity-50" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              {notif.type === "approval" && <FaCheckCircle className="text-green-500" />}
              {notif.type === "rejection" && <FaTimesCircle className="text-red-500" />}
              {notif.type === "reminder" && <FaClock className="text-blue-500" />}
              <p>{notif.message}</p>
            </div>

            {!notif.read && (
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => markAsRead(notif.id)}
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

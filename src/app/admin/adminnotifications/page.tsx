"use client";

import { useState } from "react";

export default function Notifications() {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("users");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      recipient: "Users",
      message: "New event added!",
      date: "2025-02-28",
    },
    {
      id: 2,
      recipient: "Event Organizers",
      message: "Reminder: Approve pending events",
      date: "2025-02-27",
    },
  ]);

  const sendNotification = () => {
    if (!message.trim()) return;

    const newNotification = {
      id: notifications.length + 1,
      recipient: recipient === "users" ? "Users" : "Event Organizers",
      message,
      date: new Date().toISOString().split("T")[0],
    };

    setNotifications([newNotification, ...notifications]);
    setMessage("");
  };
  

  return (
    <>
      <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Notifications Management</h1>

        {/* Notification Form */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Send Notification</h2>
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows={3}
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center">
            <select
              className="p-2 border rounded"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            >
              <option value="users">Users</option>
              <option value="organizers">Event Organizers</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={sendNotification}
            >
              Send
            </button>
          </div>
        </div>

        {/* Notification History */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Notification History</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Recipient</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif) => (
                <tr key={notif.id} className="border">
                  <td className="p-3 border">{notif.recipient}</td>
                  <td className="p-3 border">{notif.message}</td>
                  <td className="p-3 border">{notif.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

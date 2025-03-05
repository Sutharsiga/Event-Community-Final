"use client";

import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const SubmitEvent = ({ onAddEvent }: { onAddEvent: (event: any) => void }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date || !eventData.location) {
      alert("Please fill in all required fields!");
      return;
    }
    onAddEvent({ ...eventData, id: Date.now() });
    setEventData({ title: "", date: "", location: "", image: "" });
  };

  return (
    <section className="py-10 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-6">Submit a New Event</h2>

      <form
        className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {/* Event Title */}
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={handleChange}
          value={eventData.title}
        />

        {/* Date Picker */}
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="date"
            name="date"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            onChange={handleChange}
            value={eventData.date}
          />
        </div>

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={handleChange}
          value={eventData.location}
        />

        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL (Optional)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={handleChange}
          value={eventData.image}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800 transition"
        >
          Add Event
        </button>
      </form>
    </section>
  );
};

export default SubmitEvent;

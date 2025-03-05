"use client";

import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

const SearchSection = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [filters, setFilters] = useState({
    location: "",
    eventType: "",
    date: "",
    query: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center">Discover, Share, & Celebrate Local Events In Your Community.</h2>

      {/* Filters & Search Bar */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 bg-white p-4 rounded-full shadow-md">
        {/* Location */}
        <div className="flex items-center border rounded-full px-4 py-2">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <select name="location" className="outline-none bg-transparent" onChange={handleChange}>
            <option value="">Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Kandy">Kandy</option>
          </select>
        </div>

        {/* Event Type */}
        <div className="flex items-center border rounded-full px-4 py-2">
          <FaUsers className="text-gray-500 mr-2" />
          <select name="eventType" className="outline-none bg-transparent" onChange={handleChange}>
            <option value="">Event Type</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Concert">Concert</option>
          </select>
        </div>

        {/* Date Picker */}
        <div className="flex items-center border rounded-full px-4 py-2">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <input type="date" name="date" className="outline-none bg-transparent" onChange={handleChange} />
        </div>

        {/* Search Bar */}
        <div className="flex items-center border rounded-full px-4 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            name="query"
            placeholder="Search"
            className="outline-none bg-transparent"
            onChange={handleChange}
          />
        </div>

        {/* Search Button */}
        <button className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800" onClick={() => onSearch(filters)}>
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchSection;

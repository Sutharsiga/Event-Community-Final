"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Events = () => {
  const [events] = useState([
    { id: 1, image: "/images/eventdetail1.png", title: "Wedding Ceremony", date: "2025-01-20", location: "Colombo" },
    { id: 2, image: "/images/eventdetail2.png", title: "Birthday Party", date: "2025-02-15", location: "Jaffna" },
    { id: 3, image: "/images/eventdetail3.png", title: "Music Concert", date: "2025-03-10", location: "Kandy" },
    { id: 4, image: "/images/eventdetail3.png", title: "Food Festival", date: "2025-04-05", location: "Negombo" },
    { id: 5, image: "/images/eventdetail2.png", title: "Tech Meetup", date: "2025-05-18", location: "Colombo" },
    { id: 6, image: "/images/eventdetail1.png", title: "Charity Run", date: "2025-06-12", location: "Galle" },
    { id: 7, image: "/images/eventdetail2.png", title: "Cultural Dance Show", date: "2025-07-20", location: "Kandy" },
    { id: 8, image: "/images/eventdetail1.png", title: "Startup Pitch Night", date: "2025-08-30", location: "Jaffna" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-teal-700">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={500}
                height={300}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="flex items-center text-gray-600 mt-2">
                  <FaCalendarAlt className="text-teal-600 mr-2" /> {event.date}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="text-red-500 mr-2" /> {event.location}
                </p>

                <Link href={`/events/${event.id}`} passHref>
                  <button className="mt-4 w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;

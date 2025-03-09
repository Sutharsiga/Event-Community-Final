"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "../components/Header";
import SearchSection from "../components/SearchSection";
import DiscoverSection from "../components/DiscoverSection";
import EventList from "../components/EventList";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "../components/Footer";
import NewsUpdates from "@/components/home/NewsUpdates";
import Testimonials from "@/components/home/Testimonials";
import SubmitEventCTA from "@/components/home/SubmitEventCTA";

// ✅ Supabase Initialization
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// ✅ Type Definitions
interface Event {
  id: number;
  image: string;
  title: string;
  date: string;
  location: string;
}

interface Filters {
  location?: string;
  eventType?: string;
  date?: string;
  query?: string;
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({});
  const [events, setEvents] = useState<Event[]>([]); // ✅ Ensure events is an array of Event objects
  const [error, setError] = useState<string | null>(null); // ✅ Allow error to be a string or null
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch events from Supabase
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const { data, error } = await supabase.from("events").select("*");
  
  //     if (error) {
  //       console.error("Error fetching events:", error);
  //       setError(error.message); // ✅ Assign error message properly
  //     } else {
  //       console.log("Fetched events:", data);  // Log the data
  //       setEvents(data || []); // ✅ Ensure data is always an array
  //     }
  
  //     setLoading(false);
  //   };
  
  //   fetchEvents();
  // }, []);
  

  const handleSearch = (searchFilters: Filters) => {
    setFilters(searchFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchSection onSearch={handleSearch} />
      <DiscoverSection />

      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      ) : (
        <EventList filters={filters} events={events} />
      )}

      <HowItWorks />
      <NewsUpdates />
      <SubmitEventCTA />
      <Testimonials />
      <Footer />
    </div>
  );
}

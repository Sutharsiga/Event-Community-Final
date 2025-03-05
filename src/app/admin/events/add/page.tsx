"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// ✅ Supabase Initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const AddEvent = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let imageUrl = null;

    if (image) {
      const { data, error: uploadError } = await supabase.storage
        .from("events-images")
        .upload(`events/${image.name}`, image);

      if (uploadError) {
        setError("Failed to upload image.");
        setLoading(false);
        return;
      }

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events-images/events/${image.name}`;
    }

    const { data, error } = await supabase.from("events").insert([
      {
        title,
        date,
        location,
        image: imageUrl,
      },
    ]);

    if (error) {
      setError("Error adding event.");
    } else {
      router.push("/admin/events");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          className="w-full p-3 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full p-3 border rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full p-3 border rounded-lg"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          className="w-full bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-800"
          disabled={loading}
        >
          {loading ? "Adding Event..." : "Add Event"}
        </button>
      </form>

      <Link href="/admin/events" className="text-teal-700 font-semibold block text-center mt-4">
        ← Back to Events
      </Link>
    </div>
  );
};

export default AddEvent;

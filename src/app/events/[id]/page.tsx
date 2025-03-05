"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaCommentDots } from "react-icons/fa";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEvent(data);
      }

      const rsvpStatus = localStorage.getItem(`rsvp-${id}`);
      if (rsvpStatus === "confirmed") {
        setRsvpConfirmed(true);
      }

      const savedComments = JSON.parse(localStorage.getItem(`comments-${id}`) || "[]");
      setComments(savedComments);
    };

    fetchEvent();
  }, [id]);

  const handleRSVP = () => {
    if (window.confirm("Do you want to RSVP for this event?")) {
      setRsvpConfirmed(true);
      localStorage.setItem(`rsvp-${id}`, "confirmed");
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  if (!event) {
    return <div className="text-center text-gray-600 text-xl mt-10">Event not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-teal-700">{event.title}</h1>
      
      {/* Event Image */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-[80%] max-w-3xl mt-6">
        <Image src={event.image} alt={event.title} width={800} height={450} className="w-full h-[350px] object-cover" />
        
        <div className="p-6">
          <p className="text-lg text-gray-700">{event.description}</p>

          {/* Event Info */}
          <div className="flex items-center text-gray-600 text-sm mt-4">
            <FaCalendarAlt className="mr-2 text-teal-600" /> {event.date}
          </div>
          <div className="flex items-center text-gray-600 text-sm mt-2">
            <FaMapMarkerAlt className="mr-2 text-red-500" /> {event.location}
          </div>

          {/* RSVP Button */}
          <button
            onClick={handleRSVP}
            disabled={rsvpConfirmed}
            className={`mt-6 w-full py-2 rounded-lg flex items-center justify-center gap-2 transition ${
              rsvpConfirmed ? "bg-gray-400 cursor-not-allowed" : "bg-teal-700 text-white hover:bg-teal-800"
            }`}
          >
            <FaCheckCircle />
            {rsvpConfirmed ? "RSVP Confirmed" : "RSVP for Event"}
          </button>

          {/* Comment Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaCommentDots /> Comments
            </h3>
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="bg-gray-200 p-3 rounded-lg text-gray-800">
                    {comment}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800"
              >
                Post
              </button>
            </div>
          </div>

          {/* Back to Events */}
          <div className="mt-6 text-center">
            <Link href="/events" className="text-teal-700 font-semibold hover:underline">
              ← Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

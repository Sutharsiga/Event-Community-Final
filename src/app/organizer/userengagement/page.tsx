"use client";

import { useState } from "react";
import { FaRegHeart, FaHeart, FaReply } from "react-icons/fa";

const sampleComments = [
  {
    id: 1,
    user: "John Doe",
    comment: "Great event! Looking forward to the next one.",
    likes: 5,
    liked: false,
  },
  {
    id: 2,
    user: "Alice Smith",
    comment: "Had an amazing time! Thanks for organizing.",
    likes: 8,
    liked: true,
  },
];

export default function UserEngagement() {
  const [comments, setComments] = useState(sampleComments);
  const [replies, setReplies] = useState({});

  // Toggle Like
  const toggleLike = (id: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      )
    );
  };

  // Handle Reply Input
  const handleReplyChange = (id: number, value: string) => {
    setReplies((prev) => ({ ...prev, [id]: value }));
  };

  // Submit Reply
//   const submitReply = (id: number) => {
//     console.log(`Reply to Comment ${id}:`, replies[id]);
//     setReplies((prev) => ({ ...prev, [id]: "" }));
//   };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Engagement</h1>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold">{comment.user}</h2>
            <p className="text-gray-700">{comment.comment}</p>

            {/* Like & Reply Buttons */}
            <div className="flex items-center gap-4 mt-3">
              <button
                className={`flex items-center gap-1 text-sm ${comment.liked ? "text-red-500" : "text-gray-600"}`}
                onClick={() => toggleLike(comment.id)}
              >
                {comment.liked ? <FaHeart /> : <FaRegHeart />}
                {comment.likes}
              </button>

              {/* <button
                className="flex items-center gap-1 text-sm text-blue-500"
                onClick={() => submitReply(comment.id)}
              >
                <FaReply /> Reply
              </button> */}
            </div>

            {/* Reply Input */}
            {/* <input
              type="text"
              value={replies[comment.id] || ""}
              onChange={(e) => handleReplyChange(comment.id, e.target.value)}
              placeholder="Write a reply..."
              className="w-full mt-2 p-2 border rounded-md"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

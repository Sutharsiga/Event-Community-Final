import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaRegCalendarAlt, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";

interface EventCardProps {
  id: number;
  image: string;
  title: string;
  date: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, image, title, date, location }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents click event from triggering navigation
    e.preventDefault(); // Prevents default link behavior
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId: number) => favId !== id)
      : [...favorites, id];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-[320px] transition-transform duration-300 hover:scale-105 animate-fadeIn">
      <Link href={`/events/${id}`} passHref>
        <div className="cursor-pointer">
          <div className="relative">
            <Image
              src={image}
              alt={title}
              width={320}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
            >
              {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-600" />}
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <FaRegCalendarAlt className="mr-2" />
              {date}
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <FaMapMarkerAlt className="mr-2" />
              {location}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex justify-end p-4">
        <button className="text-gray-500 hover:text-gray-700">
          <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export default EventCard;

import Link from "next/link";
import EventCard from "./EventCard";


// Define the type for filters to match what's being passed
interface Filters {
  location?: string;
  eventType?: string;
  date?: string;
  query?: string;
}

// Define the type for events to match the event data
interface Event {
  id: number;
  image: string;
  title: string;
  date: string;
  location: string;
}

const EventList = ({ filters = {}, events }: { filters?: Filters; events: Event[] }) => {
  const filteredEvents = events.filter((event) => {
    
    return (
      (!filters.location || event.location === filters.location) &&
      (!filters.eventType || event.title.includes(filters.eventType)) &&
      (!filters.date || event.date === filters.date) &&
      (!filters.query || event.title.toLowerCase().includes(filters.query.toLowerCase()))
    );
  });

  return (
    
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Event Details</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} passHref>
              <div className="cursor-pointer">
                <EventCard {...event} />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No events found.</p>
        )}
      </div>
    </section>
  );
};

export default EventList;

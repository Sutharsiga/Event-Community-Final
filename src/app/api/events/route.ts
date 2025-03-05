import { createClient } from "@supabase/supabase-js";

// ✅ Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ GET: Fetch events from Supabase
export async function GET() {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events:", error);  // Log error for debugging
    return new Response("Error fetching events", { status: 500 });
  }

  console.log("Fetched events:", data); // Log fetched events to verify

  // Ensure that data is an array before checking its length
  if (!Array.isArray(data) || data.length === 0) {
    console.log("No events found in the database.");  // Log if no events found
    return new Response("No events found", { status: 404 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

// ✅ POST: Create new event
export async function POST(req: Request) {
  const { title, date, location, image } = await req.json();

  const { data, error } = await supabase
    .from("events")
    .insert([{ title, date, location, image }])
    .single();

  if (error) {
    console.error("Error creating event:", error);  // Log error for debugging
    return new Response("Error creating event", { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
}

// ✅ PUT: Update existing event
export async function PUT(req: Request) {
  const { id, title, date, location, image } = await req.json();

  const { data, error } = await supabase
    .from("events")
    .update([{ title, date, location, image }])
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error updating event:", error);  // Log error for debugging
    return new Response("Error updating event", { status: 500 });
  }

  if (!data) {
    return new Response("Event not found", { status: 404 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

// ✅ DELETE: Remove event
// export async function DELETE(req: Request) {
//   const { id } = await req.json();

//   // Fetch event from the "events" table and delete it
//   const { data, error } = await supabase.from("events").delete().eq("id", id);

//   if (error) {
//     console.error("Error deleting event:", error);  // Log error for debugging
//     return new Response("Error deleting event", { status: 500 });
//   }

//   // Type data explicitly as an array of events
//   const eventData = data as { id: number; title: string; date: string; location: string; image: string }[];

//   // Ensure that data is an array and contains elements
//   if (!Array.isArray(eventData) || eventData.length === 0) {
//     return new Response("Event not found", { status: 404 });
//   }

//   return new Response(JSON.stringify(eventData), { status: 200 });
// }

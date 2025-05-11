// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { createClient } = require("@supabase/supabase-js");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// // Example route
// app.get("/users", async (req, res) => {
//   const { data, error } = await supabase.from("users").select("*");

//   if (error) return res.status(500).json({ error: error.message });
//   res.json(data);
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Add this default GET route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

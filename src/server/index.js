
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5173; // Change this as needed

app.use(cors());
app.use(express.json());

// Route to serve the login page
app.get("/login", (req, res) => {
  res.json({ message: "Login Route Reached" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
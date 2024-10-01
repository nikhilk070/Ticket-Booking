const express = require("express");
const mongoose = require("mongoose");
const ticketRoutes = require("./routes/ticketRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const app = express();

const studentsRoutes = require("./routes/studentsRoutes");
const students2Routes = require("./routes/students2Routes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/students", studentsRoutes);
app.use("/students2", students2Routes);
app.use("/", authRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://10.70.9.55:${PORT}`);
});

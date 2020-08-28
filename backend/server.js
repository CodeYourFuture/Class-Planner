const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/classes", require("./routes/classes"));
app.use("/api/v1/bookings", require("./routes/bookings"));
app.use("/api/v1/courses", require("./routes/courseCalendar"));
app.use("/api/v1/class/bookings", require("./routes/classBookings"));

app.get("/", (request, response) => {
  response.json({
    status: "success",
    message: "keep Calm! Class Planner server is Okay",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

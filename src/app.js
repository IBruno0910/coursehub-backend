const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/course.routes");
const lessonRoutes = require("./routes/lesson.routes");
const progressRoutes = require("./routes/progress.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/sections", require("./routes/section.routes"));
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", require("./routes/enrollment.routes"));
app.use("/api/progress", progressRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API CourseHub funcionando 🚀" });
});

module.exports = app;

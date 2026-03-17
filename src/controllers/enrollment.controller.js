const enrollmentService = require("../services/enrollment.service");

async function enroll(req, res) {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const enrollment = await enrollmentService.enrollUser(userId, courseId);

    res.status(201).json(enrollment);
  } catch (error) {
    console.error("Enroll error:", error);
    res.status(500).json({ message: "Error enrolling user" });
  }
}

async function myCourses(req, res) {
  try {
    const userId = req.user.id;

    const courses = await enrollmentService.getUserCourses(userId);

    res.json(courses);
  } catch (error) {
    console.error("My courses error:", error);
    res.status(500).json({ message: "Error getting courses" });
  }
}

module.exports = {
  enroll,
  myCourses
};
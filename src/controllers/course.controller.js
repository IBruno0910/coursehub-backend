const courseService = require("../services/course.service");

async function createCourse(req, res) {
  try {
    const { title, description, published } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const course = await courseService.createCourse({
      title,
      description,
      published: published ?? false,
      authorId: req.user.id,
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error("Create course error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await courseService.getAllCourses();
    return res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  createCourse,
  getCourses,
};

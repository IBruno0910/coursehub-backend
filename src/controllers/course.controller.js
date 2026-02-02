const courseService = require("../services/course.service");

// Público
async function getPublishedCourses(req, res) {
  try {
    const courses = await courseService.getPublishedCourses();
    return res.json(courses);
  } catch (error) {
    console.error("Get published courses error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

// Admin
async function getAllCourses(req, res) {
  try {
    const courses = await courseService.getAllCourses();
    return res.json(courses);
  } catch (error) {
    console.error("Get all courses error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

// Admin
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

async function getCourseById(req, res) {
  try {
    const { id } = req.params;

    const course = await courseService.getCourseById(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    return res.json(course);
  } catch (error) {
    console.error("Get course by id error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { title, description, published } = req.body;

    if (!title && !description && published === undefined) {
      return res.status(400).json({ message: "Nada para actualizar" });
    }

    const updatedCourse = await courseService.updateCourse(id, {
      title,
      description,
      published,
    });

    return res.json(updatedCourse);
  } catch (error) {
    console.error("Update course error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    return res.status(500).json({ message: "Error del servidor" });
  }
}


module.exports = {
  getPublishedCourses,
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
};

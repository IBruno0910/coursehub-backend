const express = require("express");
const {
  getPublishedCourses,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");

const router = express.Router();

// Público → cursos publicados
router.get("/", getPublishedCourses);

// Admin → ver todos
router.get("/admin/all", authMiddleware, isAdminMiddleware, getAllCourses);

// Admin → crear curso
router.post("/", authMiddleware, isAdminMiddleware, createCourse);

// Admin → actualizar curso
router.patch("/:id", authMiddleware, isAdminMiddleware, updateCourse);

// Admin → eliminar curso
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteCourse);

// Público → curso por id (siempre al final)
router.get("/:id", getCourseById);

module.exports = router;

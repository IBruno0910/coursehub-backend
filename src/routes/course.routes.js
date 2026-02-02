const express = require("express");
const {
  getPublishedCourses,
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
} = require("../controllers/course.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");

const router = express.Router();

// Público → cursos publicados
router.get("/", getPublishedCourses);

// Público → detalle de curso
router.get("/:id", getCourseById);

// Admin → ver todos
router.get("/admin", authMiddleware, isAdminMiddleware, getAllCourses);

// Admin → crear curso
router.post("/", authMiddleware, isAdminMiddleware, createCourse);

// Admin → actualizar curso
router.put("/:id", authMiddleware, isAdminMiddleware, updateCourse);


module.exports = router;

const express = require("express");

const {
  createLesson,
  getLessonsBySection,
  deleteLesson,
  updateLesson,
} = require("../controllers/lesson.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");

const router = express.Router();

// Público → ver lecciones de una sección
router.get("/section/:sectionId", getLessonsBySection);

// Admin → crear lesson
router.post("/", authMiddleware, isAdminMiddleware, createLesson);

// Admin → Actualizar lesson
router.patch("/:id", authMiddleware, isAdminMiddleware, updateLesson);

// Admin → eliminar lesson
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteLesson);

module.exports = router;
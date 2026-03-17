const express = require("express");
const {
  createSection,
  getSectionsByCourse,
  deleteSection,
  updateSection,
} = require("../controllers/section.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");

const router = express.Router();

// Público → secciones de un curso
router.get("/course/:courseId", getSectionsByCourse);

// Admin → crear sección
router.post("/", authMiddleware, isAdminMiddleware, createSection);

// Admin → actualizar sección
router.patch("/:id", authMiddleware, isAdminMiddleware, updateSection);

// Admin → eliminar sección
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteSection);

module.exports = router;
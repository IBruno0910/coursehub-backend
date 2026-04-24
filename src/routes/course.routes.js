const express = require("express");
const {
  getPublishedCourses,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseFull,
} = require("../controllers/course.controller");

const validate = require("../middlewares/validate.middleware");
const {
  createCourseSchema,
  updateCourseSchema,
} = require("../schemas/course.schema");

const authMiddleware = require("../middlewares/auth.middleware");
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");

const router = express.Router();

// Público → cursos publicados
router.get("/", getPublishedCourses);

// Admin → ver todos
router.get("/admin/all", authMiddleware, isAdminMiddleware, getAllCourses);

// Admin → crear curso
router.post(
  "/",
  authMiddleware,
  isAdminMiddleware,
  validate(createCourseSchema),
  createCourse
);

// Admin → actualizar curso
router.patch(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  validate(updateCourseSchema),
  updateCourse
);

// Admin → eliminar curso
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteCourse);

// curso completo
router.get("/:id/full", getCourseFull);

// Público → curso por id (siempre al final)
router.get("/:id", getCourseById);

module.exports = router;

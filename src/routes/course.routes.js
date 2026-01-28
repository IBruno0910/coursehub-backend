const express = require("express");
const courseController = require("../controllers/course.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");

const router = express.Router();

// Público
router.get("/", courseController.getCourses);

// Privado (solo admin)
router.post(
  "/",
  authMiddleware,
  isAdminMiddleware,
  courseController.createCourse
);

module.exports = router;

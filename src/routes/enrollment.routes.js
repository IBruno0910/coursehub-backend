const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
  enroll,
  myCourses
} = require("../controllers/enrollment.controller");

router.post("/", authMiddleware, enroll);
router.get("/my-courses", authMiddleware, myCourses);

module.exports = router;
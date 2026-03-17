const express = require("express");
const router = express.Router();
const { markLessonComplete, getProgress } = require("../controllers/progress.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, markLessonComplete);
router.get("/course/:courseId", auth, getProgress);

module.exports = router;
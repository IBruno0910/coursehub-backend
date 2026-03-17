const { completeLesson } = require("../services/progress.service");

async function markLessonComplete(req, res) {
  try {
    const userId = req.user.id;
    const { lessonId } = req.body;

    const progress = await completeLesson(userId, lessonId);

    res.json(progress);
  } catch (error) {
    console.error("Progress error:", error);
    res.status(500).json({ error: "Error marking lesson complete" });
  }
}

const { getCourseProgress } = require("../services/progress.service");

async function getProgress(req, res) {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const progress = await getCourseProgress(userId, courseId);

    res.json(progress);
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ error: "Error getting course progress" });
  }
}

module.exports = { 
    markLessonComplete,
    getProgress
 };
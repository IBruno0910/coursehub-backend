const lessonService = require("../services/lesson.service");

async function createLesson(req, res) {
  try {
    const { title, content, videoUrl, order, sectionId } = req.body;

    const lesson = await lessonService.createLesson(
      title,
      content,
      videoUrl,
      order,
      sectionId
    );

    return res.status(201).json(lesson);
  } catch (error) {
    console.error("Create lesson error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

async function getLessonsBySection(req, res) {
  try {
    const { sectionId } = req.params;

    const lessons = await lessonService.getLessonsBySection(sectionId);

    return res.json(lessons);
  } catch (error) {
    console.error("Get lessons error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

async function deleteLesson(req, res) {
  try {
    const { id } = req.params;

    await lessonService.deleteLesson(id);

    return res.json({ message: "Lesson eliminada correctamente" });
  } catch (error) {
    console.error("Delete lesson error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  createLesson,
  getLessonsBySection,
  deleteLesson,
};
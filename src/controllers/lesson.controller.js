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

async function updateLesson(req, res) {
  try {
    const { id } = req.params;
    const { title, content, videoUrl, order } = req.body;

    if (!title && !content && !videoUrl && order === undefined) {
      return res.status(400).json({ message: "Nada para actualizar" });
    }

    const updatedLesson = await lessonService.updateLesson(id, {
      title,
      content,
      videoUrl,
      order,
    });

    return res.json(updatedLesson);
  } catch (error) {
    console.error("Update lesson error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Lección no encontrada" });
    }

    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  createLesson,
  getLessonsBySection,
  deleteLesson,
  updateLesson,
};
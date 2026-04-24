const sectionService = require("../services/section.service");

// Admin
async function createSection(req, res, next) {
  try {
    const { title, order, courseId } = req.body;

    if (!title || order === undefined || !courseId) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const section = await sectionService.createSection({
      title,
      order,
      courseId,
    });

    return res.status(201).json(section);
  } catch (error) {
    next(error);
  }
}

// Público
async function getSectionsByCourse(req, res, next) {
  try {
    const { courseId } = req.params;

    const sections = await sectionService.getSectionsByCourse(courseId);

    return res.json(sections);
  } catch (error) {
    next(error);
  }
}

// Admin
async function deleteSection(req, res, next) {
  try {
    const { id } = req.params;

    await sectionService.deleteSection(id);

    return res.json({ message: "Sección eliminada" });
  } catch (error) {
    next(error);
  }
}

async function updateSection(req, res, next) {
  try {
    const { id } = req.params;
    const { title, order } = req.body;

    if (!title && order === undefined) {
      return res.status(400).json({ message: "Nada para actualizar" });
    }

    const updatedSection = await sectionService.updateSection(id, {
      title,
      order,
    });

    return res.json(updatedSection);
  } catch (error) {
    console.error("Update section error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Sección no encontrada" });
    }

    next(error);
  }
}

module.exports = {
  createSection,
  getSectionsByCourse,
  deleteSection,
  updateSection,
};
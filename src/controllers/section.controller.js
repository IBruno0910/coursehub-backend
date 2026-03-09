const sectionService = require("../services/section.service");

// Admin
async function createSection(req, res) {
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
    console.error("Create section error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

// Público
async function getSectionsByCourse(req, res) {
  try {
    const { courseId } = req.params;

    const sections = await sectionService.getSectionsByCourse(courseId);

    return res.json(sections);
  } catch (error) {
    console.error("Get sections error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

// Admin
async function deleteSection(req, res) {
  try {
    const { id } = req.params;

    await sectionService.deleteSection(id);

    return res.json({ message: "Sección eliminada" });
  } catch (error) {
    console.error("Delete section error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  createSection,
  getSectionsByCourse,
  deleteSection,
};
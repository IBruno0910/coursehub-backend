const prisma = require("../config/prisma");

async function createLesson(title, content, videoUrl, order, sectionId) {
  return prisma.lesson.create({
    data: {
      title,
      content,
      videoUrl,
      order,
      sectionId,
    },
  });
}

async function getLessonsBySection(sectionId) {
  return prisma.lesson.findMany({
    where: { sectionId },
    orderBy: { order: "asc" },
  });
}

async function deleteLesson(id) {
  return prisma.lesson.delete({
    where: { id },
  });
}

async function updateLesson(id, data) {
  return prisma.lesson.update({
    where: { id },
    data,
  });
}

module.exports = {
  createLesson,
  getLessonsBySection,
  deleteLesson,
  updateLesson,
};
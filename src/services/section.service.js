const prisma = require("../config/prisma");

async function createSection({ title, order, courseId }) {
  return prisma.section.create({
    data: {
      title,
      order,
      courseId,
    },
  });
}

async function getSectionsByCourse(courseId) {
  return prisma.section.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
  });
}

async function deleteSection(id) {
  return prisma.section.delete({
    where: { id },
  });
}

module.exports = {
  createSection,
  getSectionsByCourse,
  deleteSection,
};
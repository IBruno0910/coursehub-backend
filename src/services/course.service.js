const prisma = require("../config/prisma");

async function createCourse(data) {
  return prisma.course.create({
    data,
  });
}

async function getPublishedCourses() {
  return prisma.course.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getAllCourses() {
  return prisma.course.findMany({
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getCourseById(id) {
  return prisma.course.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
}

module.exports = {
  createCourse,
  getPublishedCourses,
  getAllCourses,
  getCourseById,
};



const prisma = require("../config/prisma");

async function createCourse(data) {
  return prisma.course.create({
    data,
  });
}

async function getAllCourses() {
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
  });
}

module.exports = {
  createCourse,
  getAllCourses,
};

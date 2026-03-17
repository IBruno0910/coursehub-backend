const prisma = require("../config/prisma");

async function enrollUser(userId, courseId) {
  return prisma.enrollment.create({
    data: {
      userId,
      courseId
    }
  });
}

async function getUserCourses(userId) {
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: true
    }
  });
}

module.exports = {
  enrollUser,
  getUserCourses
};
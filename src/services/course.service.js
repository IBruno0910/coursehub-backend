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

async function updateCourse(id, data) {
  return prisma.course.update({
    where: { id },
    data,
  });
}

async function getPublishedCoursesPaginated(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
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
      skip,
      take: limit,
    }),
    prisma.course.count({
      where: { published: true },
    }),
  ]);

  return {
    data: courses,
    meta: {
      total,
      page,
      lastPage: Math.ceil(total / limit),
    },
  };
}

async function deleteCourse(id) {
  return prisma.course.delete({
    where: { id },
  });
}

async function getCourseByIdRaw(id) {
  return prisma.course.findUnique({
    where: { id },
  });
}

async function getCourseFull(courseId) {
  return prisma.course.findUnique({
    where: { id: courseId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" }
          }
        }
      }
    }
  });
}

module.exports = {
  createCourse,
  getPublishedCourses,
  getAllCourses,
  getCourseById,
  getCourseByIdRaw,
  updateCourse,
  getPublishedCoursesPaginated,
  deleteCourse,
  getCourseFull
};



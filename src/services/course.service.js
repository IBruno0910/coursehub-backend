const prisma = require("../config/prisma");

async function createCourse(data) {
  return prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      authorId: data.authorId
    }
  });
}

async function getPublishedCourses() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: {
      reviews: true,
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return courses.map((course) => {
    const totalReviews = course.reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : course.reviews.reduce((acc, r) => acc + r.rating, 0) /
          totalReviews;

    return {
      ...course,
      rating: Number(averageRating.toFixed(1)),
      totalReviews,
    };
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
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      reviews: true,
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  if (!course) return null;

  const totalReviews = course.reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : course.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  return {
    ...course,
    rating: Number(averageRating.toFixed(1)),
    totalReviews,
  };
}

async function updateCourse(id, data) {
  return prisma.course.update({
    where: { id },
    data,
  });
}

async function getPublishedCoursesPaginated(page = 1, limit = 10, search = "") {
  const skip = (page - 1) * limit;

  const where = {
    published: true,
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),
  };

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      include: {
        reviews: true,
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
    prisma.course.count({ where }),
  ]);

  const coursesWithRating = courses.map((course) => {
    const totalReviews = course.reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : course.reviews.reduce((acc, review) => acc + review.rating, 0) /
          totalReviews;

    return {
      ...course,
      rating: Number(averageRating.toFixed(1)),
      totalReviews,
    };
  });

  return {
    courses: coursesWithRating,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    search,
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
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      reviews: true,
      sections: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) return null;

  const totalReviews = course.reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : course.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  return {
    ...course,
    rating: Number(averageRating.toFixed(1)),
    totalReviews,
  };
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



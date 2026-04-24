const prisma = require("../config/prisma");

async function createReview({ rating, comment, userId, courseId }) {
  return prisma.review.create({
    data: {
      rating,
      comment,
      userId,
      courseId,
    },
  });
}

async function getReviewsByCourse(courseId) {
  return prisma.review.findMany({
    where: { courseId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getCourseRating(courseId) {
  const result = await prisma.review.aggregate({
    where: { courseId },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });

  return {
    courseId,
    averageRating: result._avg.rating || 0,
    totalReviews: result._count.rating,
  };
}

module.exports = {
  createReview,
  getReviewsByCourse,
  getCourseRating,
};
const prisma = require("../config/prisma");

async function getUserDashboard(userId) {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          sections: {
            include: {
              lessons: true,
            },
          },
        },
      },
    },
  });

  const completedProgress = await prisma.progress.findMany({
    where: {
      userId,
      completed: true,
    },
  });

  const completedLessonIds = new Set(completedProgress.map((p) => p.lessonId));

  const courses = enrollments.map((enrollment) => {
    const lessons = enrollment.course.sections.flatMap((section) => section.lessons);

    const totalLessons = lessons.length;
    const completedLessons = lessons.filter((lesson) =>
      completedLessonIds.has(lesson.id)
    ).length;

    const progress =
      totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

    return {
      courseId: enrollment.course.id,
      title: enrollment.course.title,
      progress,
    };
  });

  return {
    user: {
      id: userId,
    },
    stats: {
      enrolledCourses: enrollments.length,
      completedLessons: completedProgress.length,
    },
    courses,
  };
}

module.exports = {
  getUserDashboard,
};
const prisma = require("../config/prisma");

async function completeLesson(userId, lessonId) {
  return prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId
      }
    },
    update: {
      completed: true
    },
    create: {
      userId,
      lessonId,
      completed: true
    }
  });
}

async function getCourseProgress(userId, courseId) {
  const lessons = await prisma.lesson.findMany({
    where: {
      section: {
        courseId: courseId
      }
    },
    select: {
      id: true
    }
  });

  const lessonIds = lessons.map(l => l.id);

  const completedLessons = await prisma.progress.count({
    where: {
      userId,
      lessonId: {
        in: lessonIds
      },
      completed: true
    }
  });

  const totalLessons = lessonIds.length;

  const progress = totalLessons === 0
    ? 0
    : Math.round((completedLessons / totalLessons) * 100);

  return {
    totalLessons,
    completedLessons,
    progress
  };
}

module.exports = { 
    completeLesson,
    getCourseProgress
};
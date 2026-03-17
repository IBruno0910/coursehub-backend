const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin
  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@coursehub.com" },
    update: {},
    create: {
      email: "admin@coursehub.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // User
  const userPassword = await bcrypt.hash("user123", 10);

  const user = await prisma.user.upsert({
    where: { email: "user@coursehub.com" },
    update: {},
    create: {
      email: "user@coursehub.com",
      password: userPassword,
      role: "USER",
    },
  });

  // Course
  const course = await prisma.course.create({
    data: {
      title: "Curso Backend Completo",
      description: "Node.js + Prisma + PostgreSQL",
      published: true,
      authorId: admin.id,
    },
  });

  // Section
  const section = await prisma.section.create({
    data: {
      title: "Introducción",
      order: 1,
      courseId: course.id,
    },
  });

  // Lesson
  await prisma.lesson.create({
    data: {
      title: "Bienvenida",
      content: "Intro al curso",
      videoUrl: "https://video.com/intro",
      order: 1,
      sectionId: section.id,
    },
  });

  console.log("✅ Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
const prisma = require('../config/prisma');

async function createUser(email, hashedPassword) {
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

module.exports = {
  createUser,
  findUserByEmail,
};

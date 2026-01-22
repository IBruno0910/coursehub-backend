const prisma = require("../config/prisma");

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function createUser(email, hashedPassword) {
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

module.exports = {
  findUserByEmail,
  createUser,
};

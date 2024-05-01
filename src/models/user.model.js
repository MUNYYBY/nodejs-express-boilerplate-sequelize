/* eslint-disable no-console */
// model/User.js

const bcrypt = require('bcryptjs');
const { prisma } = require('../prisma/prisma-connection');

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  delete user.password;
  return user;
}

async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}
async function isEmailTaken(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

module.exports = {
  createUser,
  getUserByEmail,
  isEmailTaken,
};

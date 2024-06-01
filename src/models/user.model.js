/* eslint-disable no-console */
// model/User.js

const bcrypt = require('bcryptjs');
const { prisma } = require('../prisma/prisma-connection');

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 8);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  delete user.password;
  return user;
}

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  delete user.password;
  return user;
}
async function isEmailTaken(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}
async function findById(id, returnPassword) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user && !returnPassword) {
    delete user.password;
    return user;
  }
  return user;
}
async function UpdateUser(userId, body) {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...body,
    },
  });
  delete updatedUser.password;
  return updatedUser;
}
async function QueryUsers(data) {
  const users = await prisma.user.findMany({
    where: { ...data },
    select: {
      id: true,
      name: true,
      email: true,
      isEmailVerified: true,
      createdAt: true,
      role: true,
      // Add other fields you want to select here
    },
  });
  return users;
}
async function DeleteRecord({ id }) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createUser,
  getUserByEmail,
  isEmailTaken,
  findById,
  UpdateUser,
  QueryUsers,
  DeleteRecord,
};

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

const disconnectDatabase = async () => {
  await prisma.$disconnect();
};

module.exports = {
  prisma,
  connectDatabase,
  disconnectDatabase,
};

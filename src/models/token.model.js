const { prisma } = require('../prisma/prisma-connection');

async function createToken({ token, userId, type, expires, blacklisted }) {
  return prisma.token.create({
    data: {
      token,
      userId,
      type,
      expires,
      blacklisted,
    },
  });
}

module.exports = {
  createToken,
};

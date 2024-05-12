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
async function findOne({ token, type, blacklisted }) {
  const tokendoc = await prisma.token.findFirst({
    where: {
      token,
      type,
      blacklisted,
    },
  });
  return tokendoc;
}
async function DeleteRecord({ id }) {
  return prisma.token.delete({
    where: {
      id,
    },
  });
}
async function DeleteManyRecord(data) {
  return prisma.token.delete({
    where: {
      ...data,
    },
  });
}

module.exports = {
  createToken,
  findOne,
  DeleteRecord,
  DeleteManyRecord,
};

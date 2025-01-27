// services/TokenService.js

const { Token } = require('../sequelize/models'); // Import Sequelize Token model

async function createToken({ token, userId, type, expires, blacklisted }) {
  return Token.create({
    token,
    userId,
    type,
    expires,
    blacklisted,
  });
}

async function findOne({ token, type, blacklisted }) {
  return Token.findOne({
    where: {
      token,
      type,
      blacklisted,
    },
  });
}

async function DeleteRecord({ id }) {
  const deleted = await Token.destroy({
    where: { id },
  });
  return deleted > 0; // Return true if a record was deleted
}

async function DeleteManyRecord(data) {
  const deleted = await Token.destroy({
    where: { ...data },
  });
  return deleted > 0; // Return true if records were deleted
}

module.exports = {
  createToken,
  findOne,
  DeleteRecord,
  DeleteManyRecord,
};

/* eslint-disable no-console */
// models/UserService.js

const bcrypt = require('bcryptjs');
const { User } = require('../sequelize/models'); // Import Sequelize User model

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 8);
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });
  const userData = user.get({ plain: true });
  delete userData.password; // Remove password from the returned data
  return userData;
}

async function getUserByEmail(email) {
  const user = await User.findOne({
    where: { email },
  });
  if (user) {
    const userData = user.get({ plain: true });
    delete userData.password;
    return userData;
  }
  return null;
}

async function isEmailTaken(email) {
  const user = await User.findOne({
    where: { email },
  });
  return !!user;
}

async function findById(id, returnPassword = false) {
  const user = await User.findByPk(id); // Primary key lookup
  if (user) {
    const userData = user.get({ plain: true });
    if (!returnPassword) {
      delete userData.password;
    }
    return userData;
  }
  return null;
}
async function findByEmail(email) {
  const user = await User.findOne({
    where: { email },
  });
  if (user) {
    const userData = user.get({ plain: true });
    return userData;
  }
  return null;
}

async function UpdateUser(userId, body) {
  const [_, [updatedUser]] = await User.update(body, {
    where: { id: userId },
    returning: true, // Return the updated user data
  });
  if (updatedUser) {
    const userData = updatedUser.get({ plain: true });
    delete userData.password;
    return userData;
  }
  return null;
}

async function QueryUsers(filter) {
  const users = await User.findAll({
    where: filter,
    attributes: [
      'id',
      'name',
      'email',
      'isEmailVerified',
      'createdAt',
      'role',
      // Add other fields you want to include here
    ],
  });
  return users.map((user) => user.get({ plain: true })); // Return plain objects
}

async function DeleteRecord({ id }) {
  const deleted = await User.destroy({
    where: { id },
  });
  return deleted > 0; // Return true if a record was deleted
}

module.exports = {
  createUser,
  getUserByEmail,
  isEmailTaken,
  findById,
  UpdateUser,
  QueryUsers,
  DeleteRecord,
  findByEmail,
};

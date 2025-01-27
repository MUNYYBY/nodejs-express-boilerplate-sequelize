const logger = require('../config/logger');
const db = require('./models');

const connectDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('DB Connection successful 🚀');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

const disconnectDatabase = async () => {
  try {
    await db.sequelize.disconnectDatabase();
    logger.info('DB Connection destroyed 💥');
  } catch (error) {
    logger.error('Unable to disconnect to the database:', error);
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};

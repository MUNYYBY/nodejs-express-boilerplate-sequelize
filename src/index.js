const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { connectDatabase, disconnectDatabase } = require('./prisma/prisma-connection');
const db = require('./sequelize/models');

let server;

connectDatabase().then(() => {
  logger.info('Connected to Database');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    logger.info('Connection successful!');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  } finally {
    await db.sequelize.close();
  }
}

testConnection();

const exitHandler = async () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    await disconnectDatabase();
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

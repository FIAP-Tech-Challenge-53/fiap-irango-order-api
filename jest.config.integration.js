const config = require('./jest.config');

module.exports = {
  ...config,
  setupFilesAfterEnv: ['<rootDir>/test/integration/jest.setup.ts'],
};

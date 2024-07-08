const config = require('./jest.config');

module.exports = {
  ...config,
  setupFilesAfterEnv: ['<rootDir>/test/unit/jest.setup.ts'],
};

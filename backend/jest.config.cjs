module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  setupFiles: ['<rootDir>/src/tests/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['src/services/**/*.ts', 'src/utils/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};

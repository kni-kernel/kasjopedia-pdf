module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest'
  },
  testMatch: [
    '**/*.test.(ts|js)'
  ],
  testEnvironment: 'node'
};

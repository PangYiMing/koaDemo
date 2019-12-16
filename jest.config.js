module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: './tests/coverage',
  transform: {
    '^.+\\.(tsx|ts)?$': 'ts-jest',
    '^.+\\.(jsx?|scss$)': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js'
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  setupFiles: ['<rootDir>/tests/setup.js'],
  moduleNameMapper: {
    '\\.(scss|less)$': 'identity-obj-proxy'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom'
};

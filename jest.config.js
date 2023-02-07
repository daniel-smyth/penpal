/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tests/tsconfig.json",
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^@tests": "<rootDir>/tests/index.ts",
  },
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
};

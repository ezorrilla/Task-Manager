import type { Config } from 'jest';

const configuracion: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '^@dominio/(.*)$': '<rootDir>/src/dominio/$1',
    '^@aplicacion/(.*)$': '<rootDir>/src/aplicacion/$1',
    '^@infraestructura/(.*)$': '<rootDir>/src/infraestructura/$1',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};

export default configuracion;

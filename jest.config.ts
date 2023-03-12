import type { Config } from '@jest/types'

const nextJest = require('next/jest')

const createNextJestConfig = nextJest({
  dir: './',
})

const config: Config.InitialOptions = {
  roots: ['<rootDir>/__tests__'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
}

export default createNextJestConfig(config)

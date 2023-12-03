import { Config } from 'jest';

const config: Config = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: [
        '<rootDir>/setup-jest.ts'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/'
    ],
    transform: {
        '\\.html$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json'
            }
        ]
    },
    verbose: true
};

export default config;

import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', //means that we are using TypeScript with Jest
    testEnvironment: 'node', //the environment in which the tests will run
    verbose: true, //show individual test results with the test suite hierarchy
    collectCoverage: true, //collect coverage information
    coverageDirectory: 'coverage', //directory where Jest should output its coverage files
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "src/Drizzle/db.ts",
        "src/Drizzle/schema.ts"
    ]
}


export default config;
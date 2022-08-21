import 'dotenv/config';

const {
    DB_NAME,
    DB_TEST_NAME,
    DB_USER,
    DB_PASS,
    DB_TEST_PASS,
    DB_HOST,
    DB_DIALECT,
    DB_PORT,
    DB_TEST_PORT
} = process.env;

export const DB_CONFIG = {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
};

export const TEST_DB_CONFIG = {
    username: DB_USER,
    password: DB_TEST_PASS,
    database: DB_TEST_NAME,
    host: DB_HOST,
    port: DB_TEST_PORT,
    dialect: DB_DIALECT
};

export const PRODUCTION_DB_CONFIG = {};
export default {
    development: DB_CONFIG,
    test: TEST_DB_CONFIG,
    production: PRODUCTION_DB_CONFIG
};

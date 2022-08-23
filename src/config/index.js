import 'dotenv/config';

export default {
    PORT: process.env.APP_PORT,
    db: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    },
    db_test: {
        database: process.env.DB_TEST_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_TEST_PORT
    },
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};

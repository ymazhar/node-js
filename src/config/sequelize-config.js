const { DB_NAME, DB_USER, DB_PORT, DB_DIALECT, DB_PASS, DB_HOST } = process.env;
export default {
    development: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT
    },
    test: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT
    }
};

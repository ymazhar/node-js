import 'dotenv/config';

export const config = {
    PORT: process.env.PORT || '8080',
    db: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    },
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};

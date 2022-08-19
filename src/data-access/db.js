import { Sequelize } from 'sequelize';
const { DB_NAME, DB_USER, DB_PORT, DB_DIALECT, DB_PASS, DB_HOST } = process.env;

const db = new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT
});

export default db;

export function openConnection() {
    return db.authenticate();
}

import { Sequelize } from 'sequelize';
import { config } from '../config/index.js';

const db = new Sequelize({
    database: config.db.database,
    username: config.db.username,
    password: config.db.password,
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port
});

export default db;

export function openConnection() {
    return db.authenticate();
}

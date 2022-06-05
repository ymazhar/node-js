import { Sequelize } from 'sequelize';

const db = new Sequelize({
    database: 'crud_db',
    username: 'postgres',
    password: 'password',
    host: 'localhost',
    dialect: 'postgres',
    port: 5440
});

export default db;

export function openConnection() {
    return db.authenticate();
}

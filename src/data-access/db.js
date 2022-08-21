import { Sequelize } from 'sequelize';
import { getDataBaseConfig } from '../utils/processEnvHelpers.js';

const db = new Sequelize(getDataBaseConfig());

export default db;

export function openConnection() {
    return db.authenticate();
}

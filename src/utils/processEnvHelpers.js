import 'dotenv/config';
import { TEST_DB_CONFIG, DB_CONFIG } from '../config/sequelize-config.js';

export const getDataBaseConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    switch (env) {
        case 'test': return TEST_DB_CONFIG;
        default: return DB_CONFIG;
    }
};

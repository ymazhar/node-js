import 'dotenv/config';
import config from './index.js';

export default {
    development: {
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect
    },
    test: {
        username: config.db_test.username,
        password: config.db_test.password,
        database: config.db_test.database,
        host: config.db_test.host,
        port: config.db_test.port,
        dialect: config.db_test.dialect
    }
};

import { queryParser } from 'express-query-parser';
import express from 'express';
import { openConnection } from './data-access/db.js';
import config from './config/index.js';
import rootRouter from './api/root-router.js';

async function initialize() {
    try {
        const app = express();

        app.use(
            queryParser({
                parseNull: true,
                parseUndefined: true,
                parseBoolean: true,
                parseNumber: true
            })
        );

        app.use(express.json());

        app.use('/', rootRouter);

        app.listen(config.PORT, () => {
            console.log(`App listening on port ${config.PORT}`);
        });

        await openConnection();
    } catch (err) {
        console.error(err);
    }
}

initialize();

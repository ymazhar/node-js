import { queryParser } from 'express-query-parser';
import express from 'express';
import { openConnection } from './data-access/db.js';
import config from './config/index.js';
import rootRouter from './api/root-router.js';
import { logger } from './middleware/logger.middleware.js';
import { logErrorMiddleware, returnError } from './middleware/error.middleware.js';

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
            logger.info(`App listening on port ${config.PORT}`);
        });

        process.on('unhandledRejection', error => {
            throw error;
        });

        app.use(logErrorMiddleware);
        app.use(returnError);

        await openConnection();
    } catch (err) {
        logger.info('There was a problem starting the express server', err);
    }
}

initialize();

import { queryParser } from 'express-query-parser';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { openConnection } from './data-access/db.js';
import rootRouter from './api/root-router.js';
import { logger } from './lib/logger.js';
import { logError, logErrorMiddleware, returnError } from './lib/error.js';

async function initialize() {
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

    app.use(async (req, res, next) => {
        logger.info(`Request url: ${req.originalUrl}`);
        res.on('finish', () => logger.info(`Response status: ${res.statusCode}`));
        next();
    });

    app.use(cors());

    app.use('/', rootRouter);

    app.listen(process.env.APP_PORT, () => {
        logger.info(`App listening on port ${process.env.APP_PORT}`);
    });

    process.on('unhandledRejection', error => {
        logError(error);
    });

    process.on('uncaughtException', error => {
        logError(error);
        process.exit(1);
    });

    app.use(logErrorMiddleware);
    app.use(returnError);

    await openConnection();
}

initialize();

import { logger } from './logger.middleware.js';

export const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
};

export class CustomError extends Error {
    constructor(message, name, statusCode) {
        super(message, name, statusCode);

        this.message = message;
        this.name = name;
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}

export class SchemaValidationFailedError extends CustomError {
    constructor(message, name, statusCode) {
        super(name, statusCode);
        this.message = message;
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

export class UserLoginExistError extends CustomError {
    constructor(message, name, statusCode) {
        super(name, statusCode);
        this.message = message;
        this.name = 'UserLoginExistError';
        this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
}

export class UserNotExistError extends CustomError {
    constructor(message, name, statusCode, stack) {
        super(name, statusCode, stack);
        this.message = message;
        this.name = 'UserNotExistError';
        this.statusCode = HttpStatusCode.OK;
    }
}


export function logError(err) {
    logger.error(err);
}

export function logErrorMiddleware(err, req, res, next) {
    logError(err);
    next(err);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function returnError(err, req, res, next) {
    if (err instanceof SchemaValidationFailedError) {
        res.status(err.statusCode || 400).send(err);
    }
    res.status(err.statusCode || 500).send(err.message);
}

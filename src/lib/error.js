import { logger } from './logger.js';
import { HttpStatusCode } from './status.js';

export class CustomError extends Error {
    constructor(message, name, statusCode) {
        super();
        this.message = message;
        this.name = name;
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}

export class SchemaValidationFailedError extends CustomError {
    constructor(message, error, name, statusCode = HttpStatusCode.BAD_REQUEST) {
        super(message, name, statusCode);
        this.error = error;
    }
}

export class UserLoginExistError extends CustomError {
    constructor(message, name = 'UserLoginExistError', statusCode = HttpStatusCode.BAD_REQUEST) {
        super(message, name, statusCode);
    }
}

export class GroupExistError extends CustomError {
    constructor(message, name, statusCode) {
        super(name, statusCode);
        this.message = message;
        this.name = 'GroupExistError';
        this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
}

export class UserNotExistError extends CustomError {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'UserNotExistError';
        this.statusCode = HttpStatusCode.NOT_FOUND;
    }
}

export class GroupNotExistError extends CustomError {
    constructor(message, name, statusCode, stack) {
        super(name, statusCode, stack);
        this.message = message;
        this.name = 'GroupNotExistError';
        this.statusCode = HttpStatusCode.OK;
    }
}

export class GroupEmptyTableError extends CustomError {
    constructor(message, name, statusCode, stack) {
        super(name, statusCode, stack);
        this.message = message;
        this.name = 'GroupEmptyTableError';
        this.statusCode = HttpStatusCode.OK;
    }
}

export class GroupSoftDeletedError extends CustomError {
    constructor(message, name, statusCode, stack) {
        super(name, statusCode, stack);
        this.message = message;
        this.name = 'GroupEmptyTableError';
        this.statusCode = HttpStatusCode.OK;
    }
}

export class UnauthorizedError extends CustomError {
    constructor() {
        super();
        this.message = 'No token provided.';
        this.statusCode = HttpStatusCode.UNAUTHORIZED;
        this.name = 'UnauthorizedError';
        this.success = false;
    }
}

export class ForbiddenError extends CustomError {
    constructor(success, message, name) {
        super(message, name);
        this.message = 'Failed to authenticate token.';
        this.statusCode = HttpStatusCode.FORBIDDEN;
        this.name = 'ForbiddenError';
        this.success = false;
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
        res.status(err.statusCode || 400).json(err);
    }
    res.status(err.statusCode || 500).json(err);
}

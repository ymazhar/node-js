import { SchemaValidationFailedError } from './error.js';
import db from '../data-access/db.js';

export function asyncHandler(name, schema, handler) {
    return (req, res, next) => {
        if (schema.body) {
            const { error } = schema.body.validate(req.body, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request Body is not valid', error.details, name));
            }
        }

        if (schema.params) {
            const { error } = schema.params.validate(req.params, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request params is not valid', error.details, name));
            }
        }

        if (schema.query) {
            const { error } = schema.query.validate(req.query, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request query is not valid', error.details, name));
            }
        }

        startTransactionManager(name, (trx) => handler(req, trx))
            .then(({ status, json }) => {
                return res.status(status).json(json);
            })
            .catch(next);
    };
}

async function startTransactionManager(name, handler) {
    return db.transaction(async (trx) => {
        return handler(trx);
    });
}

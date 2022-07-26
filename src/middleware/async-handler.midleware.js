import { SchemaValidationFailedError } from '../lib/error.js';
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
    const trx = await db.transaction();

    return handler(trx);
    // try {
    //     await handler(trx);
    //
    //     // If the execution reaches this line, the transaction has been committed successfully
    //     // `result` is whatever was returned from the transaction callback (the `user`, in this case)
    //     await trx.commit();
    // } catch (error) {
    //     // If the execution reaches this line, an error occurred.
    //     // The transaction has already been rolled back automatically by Sequelize!
    //     await trx.rollback();
    // }
}

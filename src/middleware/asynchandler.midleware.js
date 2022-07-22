import { SchemaValidationFailedError } from './error.middleware.js';

export function asyncHandler(schema, handler) {
    return (req, res, next) => {
        if (schema.body) {
            const { error } = schema.body.validate(req.body, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request Body is not valid'));
            }
        }

        if (schema.params) {
            const { error } = schema.params.validate(req.params, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request params is not valid'));
            }
        }

        if (schema.query) {
            const { error } = schema.query.validate(req.query, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(new SchemaValidationFailedError('Request query is not valid'));
            }
        }

        handler(req)
            .then(({ status, json }) => {
                return res.status(status).json(json);
            })
            .catch(next);
    };
}

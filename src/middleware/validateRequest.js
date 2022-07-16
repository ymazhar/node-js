export function errorResponse(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });

    return {
        status: 'failed',
        errors
    };
}

export function validationSchema(schema) {
    return (req, res, next) => {
        if (schema.body) {
            const { error } = schema.body.validate(req.body, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                return next(res.status(400).json(errorResponse(error.details)));
            }
        }

        if (schema.params) {
            const { error } = schema.params.validate(req.params, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                res.status(400).json(errorResponse(error.details));
            } else {
                return next();
            }
        }

        if (schema.query) {
            const { error } = schema.query.validate(req.query, {
                abortEarly: false,
                allowUnknown: false
            });

            if (error && error.isJoi) {
                res.status(400).json(errorResponse(error.details));
            } else {
                return next();
            }
        }
    };
}


export class SchemaValidationFailedError {
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }
}

import Joi from 'joi';

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum(),
    age: Joi.number()
        .required()
        .integer()
        .min(4)
        .max(130)
});

export const userIdSchema = Joi.object({
    id: Joi.number().integer()
});

export const userAutoSuggestionSchema = Joi.object({
    limit: Joi.number().integer(),
    login: Joi.string()
});

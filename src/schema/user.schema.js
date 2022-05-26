import Joi from 'joi';

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum(),
    age: Joi.number()
        .required()
        .integer()
        .min(4)
        .max(130),
    isDeleted: Joi.bool().required()
});

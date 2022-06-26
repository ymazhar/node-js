import Joi from 'joi';

export const groupSchema = Joi.object({
    id: Joi.string().guid(),
    name: Joi.string().required(),
    permissions: Joi.array().required()
});

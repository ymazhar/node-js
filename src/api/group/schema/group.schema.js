import Joi from 'joi';

export const groupSchema = Joi.object({
    id: Joi.string().guid(),
    name: Joi.string().required(),
    permissions: Joi.array().items(
        Joi.string().valid('READ'),
        Joi.string().valid('WRITE'),
        Joi.string().valid('DELETE'),
        Joi.string().valid('SHARE'),
        Joi.string().valid('UPLOAD_FILES')
    ).min(1).unique().required()
});

export const groupIdSchema = Joi.object({
    id: Joi.string().guid()
});

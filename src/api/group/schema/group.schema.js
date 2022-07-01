import Joi from 'joi';

export const groupSchema = Joi.object({
    id: Joi.string().guid(),
    name: Joi.string().required(),
    permissions: Joi.array().items(
        Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'),
    ).min(1).unique().required()
});

export const groupIdSchema = Joi.object({
    id: Joi.string().guid()
});

export const groupAddUserSchema = Joi.object({
    user_id: Joi.string().guid(),
    group_id: Joi.string().guid()
});

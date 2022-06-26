import { validationSchema } from '../../middleware/validateRequest.js';
import { userAutoSuggestionSchema, userIdSchema, userSchema } from './schema/user.schema.js';
import { createUserHandler, deleteUserHandler, getAutoSuggestUsersHandler, getUserHandler, updateUserHandler } from './controllers/user.controller.js';
import express from 'express';
const userRouter = express.Router();

userRouter.get('/autosuggest?', validationSchema(userAutoSuggestionSchema, 'query'), getAutoSuggestUsersHandler);

userRouter.get('/:id', validationSchema(userIdSchema, 'params'), getUserHandler);

userRouter.post('', validationSchema(userSchema, 'body'), createUserHandler);

userRouter.put('/:id', validationSchema(userSchema, 'body'), updateUserHandler);

userRouter.delete('/:id', validationSchema(userIdSchema, 'query'), deleteUserHandler);

export default userRouter;

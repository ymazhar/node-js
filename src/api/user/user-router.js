import { validationSchema } from '../../middleware/validateRequest.js';
import { userAutoSuggestionSchema, userIdSchema, userSchema } from './schema/user.schema.js';
import {
    createUserController,
    deleteUserController,
    getAutoSuggestUsersController,
    getUserController,
    updateUserController
} from './controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/autosuggest?', validationSchema(userAutoSuggestionSchema, 'query'), getAutoSuggestUsersController);

userRouter.get('/:id', validationSchema(userIdSchema, 'params'), getUserController);

userRouter.post('', validationSchema(userSchema, 'body'), createUserController);

userRouter.put('/:id', validationSchema(userSchema, 'body'), updateUserController);

userRouter.delete('/:id', validationSchema(userIdSchema, 'query'), deleteUserController);

export default userRouter;

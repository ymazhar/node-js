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

userRouter.get('/autosuggest?', validationSchema(userAutoSuggestionSchema), getAutoSuggestUsersController);

userRouter.get('/:id', getUserController);

userRouter.post('', validationSchema(userSchema), createUserController);

userRouter.put('/:id', validationSchema(userSchema), updateUserController);

userRouter.delete('/:id', validationSchema(userIdSchema), deleteUserController);

export default userRouter;

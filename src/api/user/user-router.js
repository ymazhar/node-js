import {  asyncHandler } from '../../middleware/asynchandler.midleware.js';
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

userRouter.get('/autosuggest?', asyncHandler(userAutoSuggestionSchema, getAutoSuggestUsersController));

userRouter.get('/:id', asyncHandler(userIdSchema, getUserController));

userRouter.post('', asyncHandler(userSchema, createUserController));

userRouter.put('/:id', asyncHandler(userSchema, updateUserController));

userRouter.delete('/:id', asyncHandler(userIdSchema, deleteUserController));

export default userRouter;

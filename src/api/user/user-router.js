import {
    createUserController,
    deleteUserController,
    getAutoSuggestUsersController,
    getUserController,
    updateUserController
} from './controllers/user.controller.js';
import { Router } from 'express';
import { checkToken } from '../../middleware/authorization.js';

const userRouter = Router();

userRouter.use(checkToken);

userRouter.get('/autosuggest?', getAutoSuggestUsersController);

userRouter.get('/:id', getUserController);

userRouter.post('', createUserController);

userRouter.put('/:id', updateUserController);

userRouter.delete('/:id', deleteUserController);

export default userRouter;

import { Router } from 'express';
import userRouter from './user/user-router.js';
import groupRouter from './group/group-router.js';
import { userApi, groupApi } from './api.config.js';
const rootRouter = Router();

rootRouter.use(userApi, userRouter);
rootRouter.use(groupApi, groupRouter);

export default rootRouter;

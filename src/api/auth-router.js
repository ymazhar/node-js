// import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { getToken } from './user/controllers/user.controller.js';

const authRouter = Router();

authRouter.post('/login', getToken);

export default authRouter;

// import jwt from 'jsonwebtoken';
import { Router } from 'express';
import UserModel from './user/models/user.model.js';
import { jwtTokens } from '../utils/jwt-helpers.js';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ where: { login: username, password, isDeleted: false } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Bad username/password combination.' });
        }
        const token = jwtTokens(user);

        return res.json(token);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default authRouter;

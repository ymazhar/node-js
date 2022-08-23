import jwt from 'jsonwebtoken';
import { ForbiddenError, UnauthorizedError } from '../lib/error.js';
import config from '../config/index.js';

function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        throw new UnauthorizedError();
    }
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET, (error) => {
        if (error) {
            throw new ForbiddenError();
        }
        return next();
    });
}

export { checkToken };

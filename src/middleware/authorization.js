import jwt from 'jsonwebtoken';
import config from '../config/index.js';

function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ success: false, message: 'No token provided.' });
    }
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET, (error) => {
        if (error) {
            return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
        }
        return next();
    });
}

export { checkToken };

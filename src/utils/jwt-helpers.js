import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

function jwtTokens({ id, login }) {
    const user = { id, login };
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: 120 });
}

export { jwtTokens };

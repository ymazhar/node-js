import jwt from 'jsonwebtoken';

function jwtTokens({ id, login }) {
    const user = { id, login };
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 120 });
}

export { jwtTokens };

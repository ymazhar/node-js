import axios from 'axios';
import { createUser, getTokenByUser } from '../service/user.service.js';

describe('USER API', () => {
    it('should create user', async () => {
        const body = {
            'login': 'admin',
            'password': 'nimda',
            'age': '39'
        };
        await createUser(body);

        const token = await getTokenByUser('admin', 'nimda');
        console.log('token', token);
        const res = await axios.post('/api/auth/login', {
            'login': 'admin',
            'password': 'nimda'
        });
        console.log('res', res);
    });
});

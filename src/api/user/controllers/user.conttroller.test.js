import { mockedRequestHandler } from '../../../lib/test-helpers.js';
import { getUserController } from './user.controller.js';
import db from '../../../data-access/db.js';

const id = '8b834829-7c34-41de-9ef3-82ab7208befa';
const rawUser = {
    id,
    login: 'admin2',
    password: 'nimda2',
    age: 39,
    isDeleted: false
};
const populateDBWithTestData = async () => {
    try {
        await db.query(`INSERT INTO public.users VALUES ('${rawUser.id}', '${rawUser.login}', '${rawUser.password}', ${rawUser.age}, ${rawUser.isDeleted}); END`);
    } catch (e) {
        console.log(e);
    }
};

describe('USER API', () => {
    beforeAll(async () => {
        // Clears the database and adds some testing data.
        // Jest will wait for this promise to resolve before running tests.
        await populateDBWithTestData();
    });

    it('Should return user by id', async () => {
        const requestData = { params: { id } };

        const result = {
            json: rawUser,
            status: 200
        };

        expect(await mockedRequestHandler(getUserController, requestData)).toEqual(result);
    });
});

import { mockedRequestHandler } from '../../../lib/test-helpers.js';
import { getUserController, createUserController, updateUserController, deleteUserController, getAutoSuggestUsersController } from './user.controller.js';
import db from '../../../data-access/db.js';

const rawUser = {
    id: '8b834829-7c34-41de-9ef3-82ab7208befa',
    login: 'admin',
    password: 'nimda',
    age: 39,
    isDeleted: false
};

const populateDBWithTestData = async () => {
    const rawUserQueryValues = `'${rawUser.id}', '${rawUser.login}', '${rawUser.password}', ${rawUser.age}, ${rawUser.isDeleted}`;
    console.log(rawUserQueryValues);
    try {
        await db.query(`INSERT INTO public.users VALUES (${rawUserQueryValues})`);
    } catch (e) {
        console.log(e);
    }
};

beforeAll(() => {
    return populateDBWithTestData();
});

describe('user API', () => {
    test('should return users', async () => {
        const requestData = { query: { login: 'adm' } };
        const result = {
            json: [rawUser],
            status: 200
        };
        expect(await mockedRequestHandler(getAutoSuggestUsersController, requestData)).toEqual(result);
    });

    test('Should return user by id', async () => {
        const requestData = { params: { id: rawUser.id } };

        const result = {
            json: rawUser,
            status: 200
        };

        expect(await mockedRequestHandler(getUserController, requestData)).toEqual(result);
    });

    test('should update user ', async () => {
        const { json: { id } } = await mockedRequestHandler(getUserController, { params: { id: rawUser.id } });
        const requestData = { params: { id }, body: { age: '25' } };

        const result = {
            json: { ...rawUser, age: '25' },
            status: 200
        };

        expect(await mockedRequestHandler(updateUserController, requestData)).toEqual(result);
    });

    test('should delete user', async () => {
        const requestData = { params: { id: rawUser.id } };

        const result = {
            json: { ...rawUser, age: 25, isDeleted: true },
            status: 200
        };

        expect(await mockedRequestHandler(deleteUserController, requestData)).toEqual(result);
    });

    test('Should create user', async () => {
        const requestData = { body: { login: 'John', password: 'qwerty123', age: 22 } };

        expect(await mockedRequestHandler(createUserController, requestData)).toEqual(
            expect.objectContaining(
                {
                    json: expect.objectContaining({ login: 'John', password: 'qwerty123', age: 22, isDeleted: false }),
                    status: 200
                }));
    });

    test('should return error if user does not exist', async () => {
        const requestData = { params: { id: '8b834829-7c34-41de-9ef3-82ab7208bef9' } };

        const result = {
            'message': 'Can\'t find user with id: 8b834829-7c34-41de-9ef3-82ab7208bef9',
            'name': 'UserNotExistError',
            'statusCode': 200
        };

        expect(await mockedRequestHandler(getUserController, requestData)).toEqual(result);
    });
});

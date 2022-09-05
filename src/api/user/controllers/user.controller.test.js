import { mockedRequestHandler } from '../../../lib/test-helpers.js';
import { getUserController, createUserController, updateUserController, deleteUserController, getAutoSuggestUsersController } from './user.controller.js';
import { clearDBTestData, populateUserDBWithTestData } from '../../../utils/test-helpers.js';
import { rawUser } from './../../../test/fixtures/users.js';

beforeAll(() => {
    return populateUserDBWithTestData();
});

afterAll(() => {
    return clearDBTestData('users');
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

    test('should return user by id', async () => {
        const requestData = { params: { id: rawUser.id } };

        const result = {
            json: rawUser,
            status: 200
        };

        expect(await mockedRequestHandler(getUserController, requestData)).toEqual(result);
    });

    test('should update user', async () => {
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

    test('should create user', async () => {
        const requestData = { body: { login: 'John', password: 'qwerty123', age: 22 } };

        const result = {
            json: expect.objectContaining({ login: 'John', password: 'qwerty123', age: 22, isDeleted: false }),
            status: 200
        };

        expect(await mockedRequestHandler(createUserController, requestData)).toEqual(result);
    });

    test('should return error if user does not exist', async () => {
        const requestData = { params: { id: '8b834829-7c34-41de-9ef3-82ab7208bef9' } };

        const result = {
            'message': 'Can\'t find user with id: 8b834829-7c34-41de-9ef3-82ab7208bef9',
            'name': 'UserNotExistError',
            'statusCode': 404
        };

        expect(await mockedRequestHandler(getUserController, requestData)).toEqual(result);
    });
});

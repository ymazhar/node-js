import { mockedRequestHandler } from '../../../lib/test-helpers.js';
import { getUserController, createUserController, updateUserController, deleteUserController } from './user.controller.js';
import db from '../../../data-access/db.js';

const rawUser = {
    id: '8b834829-7c34-41de-9ef3-82ab7208befa',
    login: 'admin',
    password: 'nimda',
    age: 39,
    isDeleted: false
};

const userJohn = { login: 'John', password: 'qwerty123', age: 99 };

const populateDBWithTestData = async () => {
    try {
        await db.query(`INSERT INTO public.users VALUES ('${rawUser.id}', '${rawUser.login}', '${rawUser.password}', ${rawUser.age}, ${rawUser.isDeleted});`);
    } catch (e) {
        console.log(e);
    }
};

const clearDBTestData = async () => {
    try {
        await db.query('DROP DATABASE IF EXISTS users;');
    } catch (e) {
        console.log(e);
    }
};

beforeAll(async () => {
    return clearDBTestData();
});

describe('Create - User - Controller', () => {
    afterEach(() => {
        return clearDBTestData();
    });

    test('Should create user', async () => {
        const requestData = { body: userJohn };

        const result = {
            json: userJohn,
            status: 200
        };

        const { status } = await mockedRequestHandler(createUserController, requestData);

        expect({ json: { login: userJohn.login, password: userJohn.password, age: userJohn.age }, status }).toEqual(result);
    });
});

describe('Get - User - Controller', () => {
    beforeEach(() => {
        return populateDBWithTestData();
    });

    afterEach(() => {
        return clearDBTestData();
    });

    test('Should return user by id', async () => {
        const requestData = { params: { id: rawUser.id } };

        const result = {
            json: rawUser,
            status: 200
        };

        expect(await mockedRequestHandler(getUserController, requestData)).toEqual(result);
    });
});

// describe('Get Auto Suggest - User - Controller', () => {
//
//     beforeAll(async () => {
//         return clearDBTestData();
//     });
//     beforeEach(() => {
//         return populateDBWithTestData();
//     });
//
//     afterEach(() => {
//         return clearDBTestData();
//     });
//
//     test.only('should return user ', async () => {
//         const requestData = { query: { login: 'adm' } };
//         const user = [].push(rawUser);
//         const result = {
//             json: [{
//                 id: '8b834829-7c34-41de-9ef3-82ab7208befa',
//                 login: 'admin',
//                 password: 'nimda',
//                 age: 39,
//                 isDeleted: false
//             }],
//             status: 200
//         };
//
//         expect(await mockedRequestHandler(getAutoSuggestUsersController, requestData)).toEqual({
//             json: [{
//                 id: '8b834829-7c34-41de-9ef3-82ab7208befa',
//                 login: 'admin',
//                 password: 'nimda',
//                 age: 39,
//                 isDeleted: false
//             }],
//             status: 200
//         });
//     });
// });

describe('Update - User - Controller', () => {
    beforeEach(() => {
        return populateDBWithTestData();
    });

    afterEach(() => {
        return clearDBTestData();
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
});

describe('Delete - User - Controller', () => {
    beforeEach(() => {
        return populateDBWithTestData();
    });

    afterEach(() => {
        return clearDBTestData();
    });

    test('should delete user', async () => {
        const requestData = { params: { id: rawUser.id } };

        const result = {
            json: { ...rawUser, age: 25, isDeleted: true },
            status: 200
        };

        expect(await mockedRequestHandler(deleteUserController, requestData)).toEqual(result);
    });
});

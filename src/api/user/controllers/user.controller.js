import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAutoSuggestUsers
} from '../service/user.service.js';

export async function createUserController(req) {
    try {
        const body = req.body;
        const user = await createUser(body);

        return {
            json: user,
            status: 200
        };
    } catch (err) {
        throw new Error(err);
    }
}

export async function getUserController(req) {
    try {
        const userId = req.params.id;
        const user = await getUser(userId);

        return {
            json: user,
            status: 200
        };
    } catch (err) {
        throw new Error(err);
    }
}

export async function updateUserController(req) {
    try {
        const userId = req.params.id;
        const body = req.body;
        const user = await updateUser(userId, body);

        return {
            json: user,
            status: 200
        };
    } catch (err) {
        throw new Error(err);
    }
}

export async function deleteUserController(req) {
    try {
        const userId = req.params.id;
        const user = await deleteUser(userId);

        return {
            json: user,
            status: 200
        };
    } catch (err) {
        throw new Error(err);
    }
}

export async function getAutoSuggestUsersController(req) {
    try {
        const login = req.query.login || 'admin';
        const limit = Number(req.query.limit) || 5;

        const users = await getAutoSuggestUsers(login, limit);

        return {
            json: users,
            status: 200
        };
    } catch (err) {
        throw new Error(err);
    }
}

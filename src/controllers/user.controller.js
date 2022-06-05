import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAutoSuggestUsers
} from '../service/user.service.js';

export async function createUserHandler(req, res) {
    const body = req.body;
    const user = await createUser(body);

    if (user.name === 'Error') {
        res.status(400).send(user.message);
    } else {
        res.send(user);
    }
}

export async function getUserHandler(req, res) {
    const userId = req.params.id;
    const user = await getUser(userId);

    res.send(user);
}

export async function updateUserHandler(req, res) {
    const userId = req.params.id;
    const body = req.body;
    const user = await updateUser(userId, body);

    res.send(user);
}

export async function deleteUserHandler(req, res) {
    const userId = req.params.id;
    const user = await deleteUser(userId);

    res.send(user);
}

export async function getAutoSuggestUsersHandler(req, res) {
    const login = req.query.login || 'admin';
    const limit = Number(req.query.limit) || 5;

    const users = await getAutoSuggestUsers(login, limit);
    res.send(users);
}

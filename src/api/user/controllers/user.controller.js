import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAutoSuggestUsers
} from '../service/user.service.js';

export async function createUserController(req, res) {
    const body = req.body;
    const user = await createUser(body);

    if (user.name === 'Error') {
        res.status(400).send(user.message);
    } else {
        res.send(user);
    }
}

export async function getUserController(req, res) {
    const userId = req.params.id;
    const user = await getUser(userId);

    res.send(user);
}

export async function updateUserController(req, res) {
    const userId = req.params.id;
    const body = req.body;
    const user = await updateUser(userId, body);

    res.send(user);
}

export async function deleteUserController(req, res) {
    const userId = req.params.id;
    const user = await deleteUser(userId);

    res.send(user);
}

export async function getAutoSuggestUsersController(req, res) {
    const login = req.query.login || 'admin';
    const limit = Number(req.query.limit) || 5;

    const users = await getAutoSuggestUsers(login, limit);
    res.send(users);
}

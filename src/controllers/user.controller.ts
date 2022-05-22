import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createUser, deleteUser, findUser, getAutoSuggestUsers, updateUser } from '../service/user.service';

export async function createUserHandler(req: Request, res: Response) {
    const userId = uuidv4();
    const body = req.body;

    const user = await createUser(userId, { id: userId, ...body });

    res.send(user.get(userId));
}

export async function getUserHandler(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await findUser(userId);

    res.send(user);
}

export async function updateUserHandler(req: Request, res: Response) {
    const userId = req.params.id;
    const body = req.body;
    const user = await updateUser(userId, body);

    res.send(user.get(userId));
}

export async function deleteUserHandler(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await deleteUser(userId);

    res.send(user.get(userId));
}

export async function getAutoSuggestUsersHandler(req: Request, res: Response) {
    const login = req.query.login || 'admin';
    const limit = Number(req.query.limit) || 5;

    const users = await getAutoSuggestUsers(login, limit);
    res.send(users);
}

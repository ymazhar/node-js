import UserModel from '../models/user.model.js';
import { Op } from 'sequelize';

export async function createUser(data) {
    try {
        const isUserExistInDatabase = await isUserLoginExist(data.login);

        if (isUserExistInDatabase) {
            return new Error('login already exist');
        }

        const user = await UserModel.create(data);

        return user.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateUser(id, body) {
    try {
        const user = await UserModel.findByPk(id);
        await user.set(body);
        await user.save();

        return user.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteUser(id) {
    try {
        const user = await UserModel.findByPk(id);

        await user.set('is_deleted', true);
        await user.save();

        return user.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAutoSuggestUsers(login, limit) {
    try {
        const users = await UserModel.findAndCountAll({
            where: {
                login: {
                    [Op.substring]: login
                },
                is_deleted: false
            },
            limit
        });

        return users.rows.sort((a, b) => a.login.localeCompare(b.login));
    } catch (error) {
        throw new Error(error);
    }
}

export async function getUser(id) {
    try {
        const user = await UserModel.findByPk(id);
        const isDeleted = user.get('is_deleted');

        if (!isDeleted) {
            return user.toJSON();
        }
        return {
            error: `Cannot find a user with exist ${id} id`
        };
    } catch (error) {
        throw new Error(error);
    }
}

export async function isUserLoginExist(login) {
    try {
        let isUserExist = false;

        const users = await UserModel.findAll();

        users.forEach(user => {
            if (user.get('login') === login) {
                isUserExist = true;
            }
        });

        return isUserExist;
    } catch (error) {
        throw new Error(error);
    }
}

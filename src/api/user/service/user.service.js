import UserModel from '../models/user.model.js';
import { Op } from 'sequelize';
import { isRecordExist } from '../../../utils/isRecordExist.js';
import { UnauthorizedError, UserNotExistError, UserLoginExistError } from '../../../lib/error.js';
import { jwtTokens } from '../../../utils/jwt-helpers.js';

export async function createUser(data) {
    const isUserExistInDatabase = await isRecordExist(UserModel, { login: data.login });

    if (isUserExistInDatabase) {
        throw new UserLoginExistError(`${data.login} login already exist`);
    }

    const user = await UserModel.create(data);

    return user.toJSON();
}

export async function updateUser(id, body) {
    const user = await UserModel.findByPk(id);
    await user.set(body);
    await user.save();

    return user.toJSON();
}

export async function deleteUser(id) {
    const user = await UserModel.findByPk(id);

    await user.set('isDeleted', true);
    await user.save();

    return user.toJSON();
}

export async function getAutoSuggestUsers(login, limit) {
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
}

export async function getUser(id) {
    const user = await UserModel.findByPk(id);
    if (user === null) {
        throw new UserNotExistError(`Can't find user with id: ${id}`);
    }
    const isDeleted = user.get('is_deleted');

    if (!isDeleted) {
        return user.toJSON();
    }
}

export async function getTokenByUser(username, password) {
    const user = await UserModel.findOne({ where: { login: username, password, isDeleted: false } });
    if (!user) {
        throw new UnauthorizedError();
    }

    return jwtTokens(user);
}

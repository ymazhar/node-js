import Users from '../models/user.model';

export async function createUser(id, user) {
    try {
        return Users.set(id, user);
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateUser(id, user) {
    try {
        return Users.set(id, user);
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteUser(id) {
    try {
        const user = await findUser(id);

        return Users.set(id, { ...user, isDeleted: true });
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAutoSuggestUsers(login, limit) {
    try {
        const result = [];
        Users.forEach(user => {
            if (!user.isDeleted && user.login.includes(login)) {
                result.push(user);
            }
        });

        result.sort((a, b) => a.login.localeCompare(b.login));

        if (result.length <= limit) {
            return result;
        }
        return result.splice(0, limit);
    } catch (error) {
        throw new Error(error);
    }
}

export async function findUser(id) {
    try {
        const user = await Users.get(id);
        if (!user.isDeleted) {
            return user;
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

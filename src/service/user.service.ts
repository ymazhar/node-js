import Users from '../models/user.model';

// create user
export async function createUser(id: string, user: object) {
    try {
        return Users.set(id, user);
    } catch (error: any) {
        throw new Error(error);
    }
}

// update user
export async function updateUser(id: string, user: object) {
    try {
        return Users.set(id, user);
    } catch (error: any) {
        throw new Error(error);
    }
}

// remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection).
export async function deleteUser(id: string) {
    try {
        const user = await findUser(id);

        return Users.set(id, { ...user, isDeleted: true });
    } catch (error: any) {
        throw new Error(error);
    }
}

// get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstringin the login property
export async function getAutoSuggestUsers(login: any, limit: number) {
    try {
        const result: any = [];
        Users.forEach(user => {
            if (!user.isDeleted && user.login.includes(login)) {
                result.push(user);
            }
        });
        if (result.length <= limit) {
            return result;
        }
        return result.splice(limit, result.length - 1);
    } catch (error: any) {
        throw new Error(error);
    }
}

// find user
export async function findUser(id: any) {
    try {
        return await Users.get(id);
    } catch (error: any) {
        throw new Error(error);
    }
}

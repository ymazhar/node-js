import db from '../data-access/db.js';
import { rawGroupData } from './../test/fixtures/groups.js';
import { rawUser } from './../test/fixtures/users.js';
const { group, groupUser } = rawGroupData;

export const clearDBTestData = async (name) => {
    try {
        await db.query(`TRUNCATE ${name} CASCADE;`);
    } catch (e) {
        console.log(e);
    }
};

export const populateUserDBWithTestData = async () => {
    const userQueryValues = `'${rawUser.id}', '${rawUser.login}', '${rawUser.password}', ${rawUser.age}, ${rawUser.isDeleted}`;
    try {
        await db.query(`INSERT INTO public.users VALUES (${userQueryValues})`);
    } catch (e) {
        console.log(e);
    }
};

export const populateGroupDBWithTestData = async () => {
    try {
        await db.query(`INSERT INTO public.groups VALUES('${group.id}', '${group.name}', '{${group.permissions}}')`);
        await db.query(`INSERT INTO public.groups VALUES('${groupUser.id}', '${groupUser.name}', '{${groupUser.permissions}}')`);
    } catch (e) {
        console.log(e);
    }
};

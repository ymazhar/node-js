import db from '../data-access/db.js';
import { RAW_TEST_DATA } from './test-data.js';
const { USER, GROUP, GROUP_USER } = RAW_TEST_DATA;

export const clearDBTestData = async (name) => {
    try {
        await db.query(`DROP DATABASE IF EXISTS ${name};`);
    } catch (e) {
        console.log(e);
    }
};

export const populateUserDBWithTestData = async () => {
    const userQueryValues = `'${USER.id}', '${USER.login}', '${USER.password}', ${USER.age}, ${USER.isDeleted}`;
    try {
        await db.query(`INSERT INTO public.users VALUES (${userQueryValues})`);
    } catch (e) {
        console.log(e);
    }
};

export const populateGroupDBWithTestData = async () => {
    try {
        await db.query(`INSERT INTO public.groups VALUES('${GROUP.id}', '${GROUP.name}', '{${GROUP.permissions}}')`);
        await db.query(`INSERT INTO public.groups VALUES('${GROUP_USER.id}', '${GROUP_USER.name}', '{${GROUP_USER.permissions}}')`);
    } catch (e) {
        console.log(e);
    }
};

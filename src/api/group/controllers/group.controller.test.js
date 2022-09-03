import { mockedRequestHandler } from '../../../lib/test-helpers.js';
import db from '../../../data-access/db.js';
import { getAllGroupsController, getGroupController, updateGroupController } from './group.controller.js';
import { createGroup } from '../service/group.service.js';

const rawGroup = {
    id: '8b834829-7c34-41de-9ef3-82ab7208bef7',
    name: 'admin',
    permissions: 'WRITE,READ'
};

const rawUser = {
    id: '8b834829-7c34-41de-9ef3-82ab7208bef9',
    name: 'user',
    permissions: 'READ'
};


const populateDBWithTestData = async () => {
    try {
        await db.query(`INSERT INTO public.groups VALUES('${rawGroup.id}', '${rawGroup.name}', '{${rawGroup.permissions}}')`);
        await db.query(`INSERT INTO public.groups VALUES('${rawUser.id}', '${rawUser.name}', '{${rawUser.permissions}}')`);
    } catch (e) {
        console.log(e);
    }
};

beforeAll(() => {
    return populateDBWithTestData();
});

describe('group API', () => {
    test('should return group by id', async () => {
        const requestData = { params: { id: rawGroup.id } };

        const result = {
            json: { ...rawGroup, permissions: rawGroup.permissions.split(',') },
            status: 200
        };

        expect(await mockedRequestHandler(getGroupController, requestData)).toEqual(result);
    });

    test('should update group by id', async () => {
        const { json: { id } } = await mockedRequestHandler(getGroupController, { params: { id: rawGroup.id } });
        const requestData = { params: { id }, body: { permissions: ['SHARE'] } };

        const result = {
            json: { ...rawGroup, permissions: ['SHARE'] },
            status: 200
        };

        expect(await mockedRequestHandler(updateGroupController, requestData)).toEqual(result);
    });

    test('should return all existed groups', async () => {
        const result = {
            json: [{ ...rawUser, permissions: [rawUser.permissions] }, { ...rawGroup, permissions: ['SHARE'] }],
            status: 200
        };

        expect(await mockedRequestHandler(getAllGroupsController)).toEqual(result);
    });

    // TODO Do I need to use a transaction?
    test('should create group', async () => {
        const requestData = { body: { name: 'marketing', permissions: ['UPLOAD_FILES'] } };

        expect(await mockedRequestHandler(createGroup, requestData)).toEqual({
            json: expect.objectContaining({ name: 'marketing', permissions: ['UPLOAD_FILES'] }),
            status: 200
        });
    });
});

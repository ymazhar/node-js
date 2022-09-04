import { mockedRequestHandler } from '../../../lib/test-helpers.js';
import { createGroupController, getAllGroupsController, getGroupController, updateGroupController } from './group.controller.js';
import { PERMISSIONS } from '../constans.js';
import { clearDBTestData, populateGroupDBWithTestData } from '../../../utils/test-helpers.js';
import { RAW_TEST_DATA } from '../../../utils/test-data.js';
const { GROUP, GROUP_USER } = RAW_TEST_DATA;

beforeAll(() => {
    return populateGroupDBWithTestData();
});

afterAll(() => {
    return clearDBTestData('groups');
});

describe('group API', () => {
    test('should return group by id', async () => {
        const requestData = { params: { id: GROUP.id } };

        const result = {
            json: { ...GROUP, permissions: GROUP.permissions.split(',') },
            status: 200
        };

        expect(await mockedRequestHandler(getGroupController, requestData)).toEqual(result);
    });

    test('should update group by id', async () => {
        const { id } = GROUP;
        const requestData = { params: { id }, body: { permissions: [PERMISSIONS.SHARE] } };

        const result = {
            json: { ...GROUP, permissions: [PERMISSIONS.SHARE] },
            status: 200
        };

        expect(await mockedRequestHandler(updateGroupController, requestData)).toEqual(result);
    });

    test('should return all existed groups', async () => {
        const result = {
            json: [{ ...GROUP_USER, permissions: [GROUP_USER.permissions] }, { ...GROUP, permissions: [PERMISSIONS.SHARE] }],
            status: 200
        };

        expect(await mockedRequestHandler(getAllGroupsController)).toEqual(result);
    });

    test('should create group', async () => {
        const requestData = { body: { name: 'marketing', permissions: [PERMISSIONS.UPLOAD_FILES] } };
        const result = {
            json: expect.objectContaining({ name: 'marketing', permissions: [PERMISSIONS.UPLOAD_FILES] }),
            status: 200
        };
        expect(await mockedRequestHandler(createGroupController, requestData)).toEqual(result);
    });
});

import { PERMISSIONS } from '../api/group/constans.js';

export const RAW_TEST_DATA = {
    USER: {
        id: '8b834829-7c34-41de-9ef3-82ab7208befa',
        login: 'admin',
        password: 'nimda',
        age: 39,
        isDeleted: false
    },
    GROUP: {
        id: '8b834829-7c34-41de-9ef3-82ab7208bef7',
        name: 'admin',
        permissions: `${PERMISSIONS.WRITE},${PERMISSIONS.READ}`
    },
    GROUP_USER: {
        id: '8b834829-7c34-41de-9ef3-82ab7208bef9',
        name: 'user',
        permissions: PERMISSIONS.READ
    }
};

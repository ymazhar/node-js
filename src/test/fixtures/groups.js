import { PERMISSIONS } from '../../api/group/constans.js';

export const rawGroupData = {
    group: {
        id: '8b834829-7c34-41de-9ef3-82ab7208bef7',
        name: 'admin',
        permissions: `${PERMISSIONS.WRITE},${PERMISSIONS.READ}`
    },
    groupUser: {
        id: '8b834829-7c34-41de-9ef3-82ab7208bef9',
        name: 'user',
        permissions: PERMISSIONS.READ
    }
};

import db from '../../data-access/db.js';
import userGroupModel from '../userGroup/models/userGroup.model.js';

async function addUsersToGroup(groupId, userIds) {
    try {
        return await db.transaction(async (t) => {
            return userGroupModel.create({
                groupId,
                userIds
            }, { transaction: t });
        });
    } catch (err) {
        console.error(err);
    }
}

addUsersToGroup('c33850c3-cd4e-4e35-bd0d-0d06b4f08d7f', 'bc925b7b-d214-433d-956b-63141baeb38c');

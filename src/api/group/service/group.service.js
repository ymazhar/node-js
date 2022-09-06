import GroupModel from '../models/group.model.js';
import { isRecordExist } from '../../../utils/isRecordExist.js';
import userGroupModel from '../models/user-group.model.js';
import { GroupEmptyTableError, GroupExistError, GroupNotExistError } from '../../../lib/error.js';


export async function createGroup(data, trx) {
    const { name } = data;
    const isGroupExistInDatabase = await isRecordExist(GroupModel, { name }, trx);

    if (isGroupExistInDatabase) {
        throw new GroupExistError(`Group with name: ${name}, already exist`);
    }

    const group = await GroupModel.create(data, { transaction: trx });

    return group.toJSON();
}

export async function updateGroup(id, data) {
    const group = await GroupModel.findByPk(id);
    await group.set(data);
    await group.save();

    return group.toJSON();
}

export async function getGroup(id) {
    const group = await GroupModel.findByPk(id);

    if (!group) {
        throw new GroupNotExistError(`Cannot find a group with exist id: ${id}`);
    }
    return group.toJSON();
}

export async function getAllGroups() {
    const group = await GroupModel.findAll({
        raw: true,
        paranoid: false
    });

    if (!group.length) {
        throw new GroupEmptyTableError('Group table is empty');
    }
    return group;
}

export async function deleteGroup(id, trx) {
    const statusGroup = await GroupModel.destroy({
        where: { id },
        transaction: trx
    });
    if (statusGroup) {
        return `Group with id: ${id} was successfully soft deleted`;
    }
    throw new GroupNotExistError(`Group with id: ${id} doesn't exist`);
}

export async function addUsersToGroup(data, trx) {
    const userGroupRow = await userGroupModel.create(data, { transaction: trx });
    return userGroupRow.toJSON();
}

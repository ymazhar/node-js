import GroupModel from '../models/group.model.js';
import { isRecordExist } from '../../../utils/isRecordExist.js';
import userGroupModel from '../models/user-group.model.js';


export async function createGroup(data) {
    const { name } = data;
    try {
        const isGroupExistInDatabase = await isRecordExist(GroupModel, { name });

        if (isGroupExistInDatabase) {
            return new Error('group already exist');
        }

        const group = await GroupModel.create(data);

        return group.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateGroup(id, data) {
    try {
        const group = await GroupModel.findByPk(id);
        await group.set(data);
        await group.save();

        return group.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

export async function getGroup(id) {
    try {
        const group = await GroupModel.findByPk(id);

        if (!group) {
            return {
                error: `Cannot find a group with exist ${id} id`
            };
        }
        return group.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllGroups() {
    try {
        const group = await GroupModel.findAll({
            paranoid: false
        });

        if (!group.length) {
            return 'Group table is empty';
        }
        return group;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteGroup(id) {
    try {
        const statusGroup =  await GroupModel.destroy({
            where: { id }
        });
        if (statusGroup) {
            return `Group with id: ${id} was successfully soft deleted`;
        }
        return `Group with id: ${id} doesn't exist`;
    } catch (error) {
        throw new Error(error);
    }
}

export async function addUsersToGroup(data, transaction) {
    try {
        const userGroupRow = await userGroupModel.create(data, { transaction });
        await transaction.commit();
        return userGroupRow.toJSON();
    } catch (error) {
        await transaction.rollback();
        throw new Error(error);
    }
}

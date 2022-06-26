import GroupModel from '../models/group.model.js';
import { isRecordExist } from '../../../utils/isRecordExist.js';


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

export async function updateGroup(id, body) {
    try {
        const group = await GroupModel.findByPk(id);
        await group.set(body);
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

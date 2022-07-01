import {
    createGroup,
    updateGroup,
    getGroup,
    getAllGroups,
    deleteGroup, addUsersToGroup
} from '../service/group.service.js';
import db from '../../../data-access/db.js';

export async function createGroupController(req, res) {
    const body = req.body;
    const group = await createGroup(body);

    if (group.name === 'Error') {
        res.status(400).send(group.message);
    } else {
        res.send(group);
    }
}

export async function updateGroupController(req, res) {
    const groupId = req.params.id;
    const body = req.body;
    const group = await updateGroup(groupId, body);

    res.send(group);
}

export async function getGroupController(req, res) {
    const groupId = req.params.id;
    const group = await getGroup(groupId);

    res.send(group);
}

export async function getAllGroupsController(req, res) {
    const groups = await getAllGroups();

    res.send(groups);
}

export async function deleteGroupController(req, res) {
    const groupId = req.params.id;
    const group = await deleteGroup(groupId);

    res.send(group);
}

export async function addUserGroupController(req, res) {
    const transaction = await db.transaction();
    const { user_id, group_id } = req.body;
    const userGroup = await addUsersToGroup({ user_id, group_id }, transaction);

    res.send(userGroup);
}

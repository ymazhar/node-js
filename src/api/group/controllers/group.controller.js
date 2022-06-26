import {
    createGroup,
    updateGroup,
    getGroup,
    getAllGroups,
    deleteGroup
} from '../service/group.service.js';

export async function createGroupHandler(req, res) {
    const body = req.body;
    const group = await createGroup(body);

    if (group.name === 'Error') {
        res.status(400).send(group.message);
    } else {
        res.send(group);
    }
}

export async function updateGroupHandler(req, res) {
    const groupId = req.params.id;
    const body = req.body;
    const group = await updateGroup(groupId, body);

    res.send(group);
}

export async function getGroupHandler(req, res) {
    const groupId = req.params.id;
    const group = await getGroup(groupId);

    res.send(group);
}

export async function getAllGroupsHandler(req, res) {
    const groups = await getAllGroups();

    res.send(groups);
}

export async function deleteGroupHandler(req, res) {
    const groupId = req.params.id;
    const group = await deleteGroup(groupId);

    res.send(group);
}

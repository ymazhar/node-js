import { Router } from 'express';
import {
    createGroupController,
    getGroupController,
    getAllGroupsController,
    updateGroupController,
    deleteGroupController,
    addUserGroupController
} from './controllers/group.controller.js';
import { validationSchema } from '../../middleware/validateRequest.js';
import { groupAddUserSchema, groupIdSchema, groupSchema } from './schema/group.schema.js';
const groupRouter = Router();

groupRouter.post('/', validationSchema(groupSchema), createGroupController);

groupRouter.put('/:id', validationSchema(groupIdSchema), updateGroupController);

groupRouter.get('/:id', validationSchema(groupIdSchema), getGroupController);

groupRouter.get('/', getAllGroupsController);

groupRouter.delete('/:id', validationSchema(groupIdSchema), deleteGroupController);

groupRouter.post('/adduser', validationSchema(groupAddUserSchema), addUserGroupController);

export default groupRouter;

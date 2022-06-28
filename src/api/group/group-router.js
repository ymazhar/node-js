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

groupRouter.post('/', validationSchema(groupSchema, 'body'), createGroupController);

groupRouter.put('/:id', validationSchema(groupIdSchema, 'params'), updateGroupController);

groupRouter.get('/:id', validationSchema(groupIdSchema, 'params'), getGroupController);

groupRouter.get('/', getAllGroupsController);

groupRouter.delete('/:id', validationSchema(groupIdSchema, 'params'), deleteGroupController);

groupRouter.post('/adduser', validationSchema(groupAddUserSchema, 'body'), addUserGroupController);

export default groupRouter;

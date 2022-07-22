import { Router } from 'express';
import {
    createGroupController,
    getGroupController,
    getAllGroupsController,
    updateGroupController,
    deleteGroupController,
    addUserGroupController
} from './controllers/group.controller.js';
import { asyncHandler } from '../../middleware/asynchandler.midleware.js';
import { groupAddUserSchema, groupIdSchema, groupSchema } from './schema/group.schema.js';
const groupRouter = Router();

groupRouter.post('/', asyncHandler(groupSchema), createGroupController);

groupRouter.put('/:id', asyncHandler(groupIdSchema), updateGroupController);

groupRouter.get('/:id', asyncHandler(groupIdSchema), getGroupController);

groupRouter.get('/', getAllGroupsController);

groupRouter.delete('/:id', asyncHandler(groupIdSchema), deleteGroupController);

groupRouter.post('/adduser', asyncHandler(groupAddUserSchema), addUserGroupController);

export default groupRouter;

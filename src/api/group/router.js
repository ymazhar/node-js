import express from 'express';
import {
    createGroupHandler,
    getGroupHandler,
    getAllGroupsHandler,
    updateGroupHandler,
    deleteGroupHandler
} from './controllers/group.controller.js';
import { validationSchema } from '../../middleware/validateRequest.js';
import { groupIdSchema, groupSchema } from './schema/group.schema.js';
const groupRouter = express.Router();

groupRouter.post('/', validationSchema(groupSchema, 'body'), createGroupHandler);

groupRouter.put('/:id', validationSchema(groupIdSchema, 'params'), updateGroupHandler);

groupRouter.get('/:id', validationSchema(groupIdSchema, 'params'), getGroupHandler);

groupRouter.get('/', getAllGroupsHandler);

groupRouter.delete('/:id', validationSchema(groupIdSchema, 'params'), deleteGroupHandler);

export default groupRouter;

import express from 'express';
import {
    createGroupHandler,
    getGroupHandler,
    getAllGroupsHandler,
    updateGroupHandler,
    deleteGroupHandler
} from './controllers/group.controller.js';
const groupRouter = express.Router();

groupRouter.post('/', createGroupHandler);

groupRouter.put('/:id', updateGroupHandler);

groupRouter.get('/:id', getGroupHandler);

groupRouter.get('/', getAllGroupsHandler);

groupRouter.delete('/:id', deleteGroupHandler);

export default groupRouter;

import { validationSchema } from '../../middleware/validateRequest.js';
import { userAutoSuggestionSchema, userIdSchema, userSchema } from './schema/user.schema.js';
import { createUserHandler, deleteUserHandler, getAutoSuggestUsersHandler, getUserHandler, updateUserHandler } from './controllers/user.controller.js';
import express from 'express';
const router = express.Router();

router.get('/users/:id', validationSchema(userIdSchema, 'params'), getUserHandler);

router.post('/users', validationSchema(userSchema, 'body'), createUserHandler);

router.put('/users/:id', validationSchema(userSchema, 'body'), updateUserHandler);

router.delete('/users/:id', validationSchema(userIdSchema, 'params'), deleteUserHandler);

router.get('/autosuggest/users', validationSchema(userAutoSuggestionSchema, 'query'), getAutoSuggestUsersHandler);

export default router;

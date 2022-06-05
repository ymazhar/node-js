import { queryParser } from 'express-query-parser';
import express from 'express';
import {
    createUserHandler,
    deleteUserHandler,
    getUserHandler,
    updateUserHandler,
    getAutoSuggestUsersHandler
} from './controllers/user.controller.js';

import { userIdSchema, userSchema, userAutoSuggestionSchema } from './schema/user.schema.js';
import { validationSchema } from './middleware/validateRequest.js';
import { openConnection } from './data-access/db.js';

const app = express();
const PORT = 3000;

await openConnection();

app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true
    })
);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.use(express.json());

app.get('/api/users/:id', validationSchema(userIdSchema, 'params'), getUserHandler);

app.post('/api/users', validationSchema(userSchema, 'body'), createUserHandler);

app.put('/api/users/:id', validationSchema(userSchema, 'body'), updateUserHandler);

app.delete('/api/users/:id', validationSchema(userIdSchema, 'params'), deleteUserHandler);

app.get('/api/autosuggest/users', validationSchema(userAutoSuggestionSchema, 'query'), getAutoSuggestUsersHandler);

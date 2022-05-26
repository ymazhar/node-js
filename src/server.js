import express from 'express';
import {
    createUserHandler,
    deleteUserHandler,
    getAutoSuggestUsersHandler,
    getUserHandler,
    updateUserHandler
} from './controllers/user.controller.js';

import { userSchema } from './schema/user.schema.js';
import { validationSchema } from './middleware/validateRequest.js';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.use(express.json());

app.get('/api/users/:id', getUserHandler);

app.post('/api/users', validationSchema(userSchema), createUserHandler);

app.put('/api/users/:id', validationSchema(userSchema), updateUserHandler);

app.delete('/api/users/:id', deleteUserHandler);

app.get('/api/autosuggest/users', getAutoSuggestUsersHandler);

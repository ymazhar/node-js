import express from 'express';
import {
    createUserHandler,
    deleteUserHandler,
    getAutoSuggestUsersHandler,
    getUserHandler,
    updateUserHandler
} from './controllers/user.controller.js';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.use(express.json());

app.get('/api/users/:id', getUserHandler);

app.post('/api/users', createUserHandler);

app.put('/api/users/:id', updateUserHandler);

app.delete('/api/users/:id', deleteUserHandler);

app.get('/api/autosuggest/users', getAutoSuggestUsersHandler);

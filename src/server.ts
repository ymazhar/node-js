import express, { Application } from 'express';
import { createUserHandler, deleteUserHandler, getAutoSuggestUsersHandler, getUserHandler, updateUserHandler } from './controllers/user.controller';

const app: Application = express();
const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.use(express.json());

app.get('/api/users/:id', getUserHandler);

app.post('/api/users', createUserHandler);

app.put('/api/users/:id', updateUserHandler);

app.delete('/api/users/:id', deleteUserHandler);

app.get('/api/autosuggest/users', getAutoSuggestUsersHandler);

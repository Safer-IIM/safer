import express from 'express';
import { getUsers } from '../handlers/getUsers.js';
import { insertUser } from '../handlers/insertUser.js';

const app = express()

app.get('/', getUsers)
app.post('/', insertUser)

export default app;
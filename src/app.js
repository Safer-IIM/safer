import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import { connectDb } from './database.js';
import credentialsRoute from './routes/credentialsRoute.js';
import usersRoute from './routes/usersRoute.js';

dotenv.config()
const port = 4000;
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

connectDb();

app.use('/api/users', usersRoute)
app.use('/api/', credentialsRoute)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
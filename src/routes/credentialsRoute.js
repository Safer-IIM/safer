import express from 'express';
import { signup } from '../handlers/signup.js';
import { validationSignupSchema } from '../middlewares/validations.js';

const app = express()

// app.post('/login', login)
app.post('/signup', validationSignupSchema, signup)

export default app;
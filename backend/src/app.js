import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

//Import Routers

import TodoRouter from './routes/todo.routes.js';
import UserRouter from './routes/user.routes.js';

app.use('/api/todos', TodoRouter);
app.use('/api/users', UserRouter);

export default app;

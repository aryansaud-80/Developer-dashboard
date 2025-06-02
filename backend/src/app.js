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

TodoRouter.use("/api/todo");

export default app;

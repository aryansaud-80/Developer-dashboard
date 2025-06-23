import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

//Import Routers

import TodoRouter from './routes/todo.routes.js';
import UserRouter from './routes/user.routes.js';
import TodoSnippetRouter from './routes/snippet.routes.js';

app.use('/api/todos', TodoRouter);
app.use('/api/users', UserRouter);
app.use('/api/snippet', TodoSnippetRouter);

import globalErrorHandler from './middlewares/globalErrorHandler.middleware.js';

app.use(globalErrorHandler);

export default app;

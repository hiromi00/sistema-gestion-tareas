import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { TareaRouter } from './domain/Tarea';
import { UsuarioRouter } from './domain/Usuario';

import './strategies/passportStrategy';
import { VerifyToken, errorHandler } from './middleware';

const envVars = dotenv.config({
  path: path.join(process.cwd(), `.env`),
});
if (envVars.error) {
  throw envVars.error;
}

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/auth', UsuarioRouter);
app.use('/tareas', VerifyToken, TareaRouter);

app.use(errorHandler);

export default app;

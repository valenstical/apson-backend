import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

import router from './routes/index';

process.env.BASE_DIR = __dirname;
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ dest: '' }).any());

app.use('/', router);

app.listen(PORT);

export default app;

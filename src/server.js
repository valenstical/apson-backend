import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT);

export default app;

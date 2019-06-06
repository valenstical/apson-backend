import express from 'express';
import auth from './auth';
import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';

const router = express.Router();

router.use('/auth', auth);

router.all('*', (request, response) => {
  Response.send(response, STATUS.NOT_FOUND, [], MESSAGE.NOT_FOUND, false);
});

export default router;

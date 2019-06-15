import express from 'express';
import membersRoute from './members';
import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';

const router = express.Router();

router.use('/members', membersRoute);

router.all('*', (request, response) => {
  Response.send(response, STATUS.NOT_FOUND, [], MESSAGE.NOT_FOUND, false);
});

export default router;

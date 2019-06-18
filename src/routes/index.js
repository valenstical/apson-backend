import express from 'express';
import membersRoute from './members';
import schoolRoute from './schools';
import paymentRoute from './payments';
import { Response } from '../helpers/utils';
import { STATUS, MESSAGE } from '../helpers/constants';

const router = express.Router();

router.use('/members', membersRoute);
router.use('/schools', schoolRoute);
router.use('/payments', paymentRoute);

router.all('*', (request, response) => {
  Response.send(response, STATUS.NOT_FOUND, [], MESSAGE.NOT_FOUND, false);
});

export default router;

import express from 'express';
import { Validator, handleValidation } from '../middleware/validator';

const router = express.Router();

router.post('/login', Validator.validateLogin, handleValidation);

export default router;

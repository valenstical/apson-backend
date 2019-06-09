import express from 'express';
import { Validator, handleValidation } from '../middleware/validator';
import MemberController from '../controllers/memberController';

const router = express.Router();

router.post(
  '/login',
  Validator.validateLogin,
  handleValidation,
  MemberController.login,
);
router.post(
  '/register',
  Validator.validateRegistration,
  handleValidation,
  MemberController.register,
);

export default router;

import express from 'express';
import { Validator, handleValidation } from '../middleware/validator';
import MemberController from '../controllers/memberController';

const router = express.Router();

// Login member
router.post(
  '/login',
  Validator.validateLogin,
  handleValidation,
  MemberController.login,
);
// Register a new member
router.post(
  '/',
  Validator.validateRegistration,
  handleValidation,
  MemberController.register,
);
// Update member details
router.patch(
  '/',
  Validator.validateToken,
  Validator.validateMemberDetails,
  handleValidation,
  MemberController.register,
);

export default router;

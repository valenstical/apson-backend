import express from 'express';
import { Validator, handleValidation } from '../middleware/validator';
import MemberController from '../controllers/memberController';

const router = express.Router();

// Login member
router.post('/login', Validator.validateLogin, handleValidation, MemberController.login);

// Register a new member
router.post('/', Validator.validateRegistration, handleValidation, MemberController.registerMember);

// Update member details
router.patch(
  '/',
  Validator.validateToken,
  Validator.validateMemberDetails,
  handleValidation,
  MemberController.updateMember,
);

// Update member profile image
router.patch(
  '/image',
  Validator.validateToken,
  Validator.validateImage,
  handleValidation,
  MemberController.updateProfileImage,
);

export default router;

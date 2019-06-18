import {
  validateRequired,
  validateEmail,
  validatePhone,
} from './validator';

export const validateContactUs = [
  validateEmail(),
  validatePhone(),
  validateRequired('name', 'Your name is required'),
  validateRequired('subject', 'Choose a subject'),
  validateRequired('message', 'Enter the message you wish to send'),
  validateRequired('receiver', 'There is no email for a receiver'),
];

export default {};

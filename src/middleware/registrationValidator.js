import {
  validateRequired,
  validatePhone,
} from './validator';

export const validateRegistration = [
  validatePhone(),
  validateRequired('name', 'School name is required'),
  validateRequired('lga', 'LGA is required'),
  validateRequired('state', 'State is required'),
];

export default {};

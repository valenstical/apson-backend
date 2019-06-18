import express from 'express';
import { Response } from '../helpers/utils';
import { STATUS, LGAS } from '../helpers/constants';
import { validateContactUs } from '../middleware/contactValidator';
import { handleValidation } from '../middleware/validator';
import ContactController from '../controllers/contactController';
import { validateRegistration } from '../middleware/registrationValidator';
import RegistrationController from '../controllers/registrationController';

const router = express.Router();

// Get LGAs
router.get('/lgas', (request, response) => Response.send(response, STATUS.OK, LGAS[request.query.state], '', true),);

// Contact us
router.post('/contact', validateContactUs, handleValidation, ContactController.sendMessage);

// Contact us
router.post('/registration', validateRegistration, handleValidation, RegistrationController.register);

export default router;

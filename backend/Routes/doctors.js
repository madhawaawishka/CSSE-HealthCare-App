import express from 'express';
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDocotorProfile} from '../Controllers/doctorController.js';

import { authenticate, restrict } from '../auth/verifyToken.js';
import reviewRoutes from './review.js';

const router = express.Router();

//nested route

router.use('/:doctorId/reviews', reviewRoutes);

router.get('/:id', getSingleDoctor);	
router.get('/', getAllDoctor);	
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);	
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);	

router.get('/profile/me', authenticate, restrict(['doctor']), getDocotorProfile);


export default router;
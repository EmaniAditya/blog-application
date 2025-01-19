import { Router } from 'express';
import signinRoute from './signin';
import signupRoute from './signup'
const router = Router(); 

router.use('/signup', signupRoute)
router.use('/signin', signinRoute);


export default router;
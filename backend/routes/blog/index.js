import { Router } from 'express';
import postRoute from './post'

const router = Router();

router.use('/post', postRoute)

export default router
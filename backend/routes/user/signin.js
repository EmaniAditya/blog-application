import { Router } from 'express';

const router = Router(); 

router.post('/', (req, res) => {
    res.send('Signin route is working!');
});

export default router; 

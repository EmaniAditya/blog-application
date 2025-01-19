import { Router } from 'express'

const router = Router()

router.post('/', (req,res) => {
    res.send('Signup route is working')
})

export default router
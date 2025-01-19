import { Router } from "express";

const router = Router()

router.post('/', (req, res) => {
    res.send('Blog posted')
})

export default router
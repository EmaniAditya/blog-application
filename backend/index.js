import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user/index'
import blogRoutes from './routes/blog/index'

const app = express()
app.use(cors())

app.use('/user', userRoutes)
app.use('/blog', blogRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


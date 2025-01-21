import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: "no token provided, authorization denied"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message: "invalid token"
        })
    }
}

export default protect

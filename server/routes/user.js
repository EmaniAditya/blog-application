import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../db/user"
import protect from "../authMiddleware"

const router = express.Router()

router.post('/signup', async (req, res) => {
    const {name, email, password, bio} = req.body

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields required"
        })
    }

    try {
        const userExists = await User.findOne({email})
        if(!userExists) {
            return res.status(400).json({
                message: "user already exists."
            })
        }

        const user = new User({
            name, 
            email,
            password,
            bio
        })

        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.status(201).json({
            message: "user created successfully!",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating user.", 
            error: error.message
        })
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "please fill required fields"
        })
    }

    try {
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                message: "invalid credentials"
            })

            const isPasswordCorrect = await user.matchPassword(password)

            if(!isPasswordCorrect) {
                return res.status(400).json({
                    message: "invalid credentials"
                })
            }

            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)

            res.json({
                message: "login successful!",
                token
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "error logging in",
            error: error.message
        })
    }
})

// add an auth middleware to protect the below routes
protect()

router.put('/:id', (req,res) => {
    // update user profile
})

router.get('/:id', (req, res) => {
    // get user profile
})

router.delete('/:id', (req,res) => {
    // delete their user profile
})

export default router
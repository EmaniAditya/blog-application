import express from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from "../db/user.js"
import protect from "../authMiddleware.js"
import { z } from "zod"

const router = express.Router()

const signupSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.string().email("invalid email address").min(1, "email is required"),
    password: z.string().min(6, "password must be at least 6 characters"),
    bio: z.string().max(500, "bio is too long").optional()
})

const loginSchema = z.object({
    email: z.string().email("invalid email address").min(1, "email is required"),
    password: z.string().min(1, "password is required")
})

router.post('/signup', async (req, res) => {
    const { name, email, password, bio } = req.body

    try {
        const result = signupSchema.safeParse({ name, email, password, bio })
        if (!result.success) {
            return res.status(400).json({
                message: result.error.errors[0].message,
            })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                message: "user already exists",
            })
        }

        const user = new User({ name, email, password, bio }) 
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(201).json({
            message: "user created successfully",
            token,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "error creating user",
            error: error.message,
        })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const result = loginSchema.safeParse({ email, password })
        if (!result.success) {
            return res.status(400).json({
                message: result.error.errors[0].message,
            })
        }

        const user = await User.findOne({ email })
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({
                message: "invalid credentials",
            })
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        
        res.json({
            message: "login successful",
            token,
        })
    } catch (error) {
        res.status(400).json({
            message: "error logging in",
            error: error.message,
        })
    }
})

router.put('/:id', protect, async (req, res) => {
    const { id } = req.params
    const { name, email, password, bio } = req.body

    try {
        if (req.user.id !== id) {
            return res.status(403).json({
                message: "unauthorized action",
            })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }

        if (name) user.name = name
        if (email) user.email = email
        if (bio !== undefined) user.bio = bio
        if (password) user.password = await bcrypt.hash(password, 10)

        await user.save()

        res.json({
            message: "user profile updated successfully",
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: "error updating user profile",
            error: error.message,
        })
    }
})

router.get('/:id', protect, async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }

        res.json({ user })
    } catch (error) {
        res.status(500).json({
            message: "error fetching user profile",
            error: error.message,
        })
    }
})

router.delete('/:id', protect, async (req, res) => {
    const { id } = req.params

    try {
        if (req.user.id !== id) {
            return res.status(403).json({
                message: "unauthorized action",
            })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }

        await User.deleteOne({ _id: id })

        res.json({
            message: "user profile deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "error deleting user profile",
            error: error.message,
        })
    }
})

export default router

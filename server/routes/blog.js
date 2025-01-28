import express from "express"
import Blog from "../db/blog.js"
import protect from "../authMiddleware.js" 
import { z } from "zod"

const router = express.Router()

const blogSchema = z.object({
    title: z.string().min(1, "title is required"),
    content: z.string().min(1, "content is required"),
    published: z.boolean().optional()
})

router.post('/', protect, async (req, res) => {
    const { title, content, published } = req.body

    try {
        blogSchema.parse({ title, content, published })

        const newBlog = new Blog({ 
            title, 
            content, 
            author: req.user.id,  
            published 
        })

        await newBlog.save()

        res.status(201).json({
            message: "blog created successfully",
            blog: newBlog
        })
    } catch (error) {
        res.status(400).json({
            message: error.errors ? error.errors[0].message : "error creating blog",
            error: error.message
        })
    }
})


router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true })
        res.json({ blogs })
    } catch (error) {
        res.status(500).json({
            message: "error fetching blogs",
            error: error.message
        })
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                message: "blog not found"
            })
        }

        res.json({ blog })
    } catch (error) {
        res.status(500).json({
            message: "error fetching blog",
            error: error.message
        })
    }
})


router.put('/:id', protect, async (req, res) => {
    const { id } = req.params
    const { title, content, published } = req.body

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                message: "blog not found"
            })
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "unauthorized action, you are not the author"
            })
        }

        blogSchema.parse({ title, content, published })

        blog.title = title || blog.title
        blog.content = content || blog.content
        blog.published = published !== undefined ? published : blog.published

        await blog.save()

        res.json({
            message: "blog updated successfully",
            blog
        })
    } catch (error) {
        res.status(400).json({
            message: error.errors ? error.errors[0].message : "error updating blog",
            error: error.message
        })
    }
})


router.delete('/:id', protect, async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                message: "blog not found"
            })
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "unauthorized action, you are not the author"
            })
        }

        await Blog.deleteOne({ _id: id })

        res.json({
            message: "blog deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "error deleting blog",
            error: error.message
        })
    }
})

export default router
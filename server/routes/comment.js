import express from "express"
import Comment from "../db/comment.js"
import Blog from "../db/blog.js"
import { z } from "zod"
import protect from "../authMiddleware.js" 

const router = express.Router()

const commentSchema = z.object({
    content: z.string().min(1, "content is required"),
    blog: z.string().min(1, "blog ID is required")
})


router.post('/', protect, async (req, res) => {
    const { content, blog } = req.body
    const author = req.user.id 

    try {

        commentSchema.parse({ content, blog })

        const blogExists = await Blog.findById(blog)
        if (!blogExists) {
            return res.status(404).json({
                message: "blog not found"
            })
        }

        const newComment = new Comment({ content, author, blog })
        await newComment.save()

        res.status(201).json({
            message: "comment added successfully",
            comment: newComment
        })
    } catch (error) {
        res.status(400).json({
            message: error.errors ? error.errors[0].message : "error adding comment",
            error: error.message
        })
    }
})

router.get('/:blogId', async (req, res) => {
    const { blogId } = req.params

    try {
        const comments = await Comment.find({ blog: blogId }).populate('author', 'name email')
        res.json({ comments })
    } catch (error) {
        res.status(500).json({
            message: "error fetching comments",
            error: error.message
        })
    }
})

export default router

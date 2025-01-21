import express from "express"
import Blog from "../db/blog"

const router = express.Router()

router.post('/'), async (req, res) => {
    const {title, content, author, published} = req.body

    if(!title || !content || !author) {
        return res.status(400).json({
            message: "please provide all requierd fields"
        })

        try {
            const newBlog = new Blog({
                title,
                content,
                author,
                published
            })

            await newBlog.save()

            res.status(201).json({
                message: "blog created successfully!",
                blog: newBlog
            })
        } catch (error) {
            res.status(500).json({
                message: "error creating blog",
                error: error.message
            })
        }
    }
}

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.json({blog})
    } catch (error) {
        res.status(500).json({
            message: "error fetching blogs",
            error: error.message
        })
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const blog = Blog.findById(id)

        if(!blog) {
            return res.status(404).json({
                message: "blog not found"
            })
        }

        res.json(({blog}))
    } catch (error) {
        res.status(500).json({
            message: "error fetching blog",
            error: error.message
        })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, content, published } = req.body

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({ 
                message: "blog not found" 
            })
        }

        blog.title = title || blog.title
        blog.content = content || blog.content
        blog.published = published !== undefined ? published : blog.published

        await blog.save()

        res.json({
            message: "blog updated successfully!",
            blog
        })
    } catch (error) {
        res.status(500).json({ 
            message: "Error updating blog.", 
            error: error.message 
        })
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({ 
                message: "blog not found" 
            })
        }

        await blog.remove()

        res.json({ 
            message: "blog deleted successfully!" 
        })
    } catch (error) {
        res.status(500).json({ 
            message: "error deleting blog.", 
            error: error.message 
        })
    }
})


export default router
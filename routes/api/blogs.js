const express = require('express')
const { check, validationResult } = require('express-validator')
const Blog = require('../../models/Blog')

const router = express.Router()

//@route   POST api/blogs
//@desc    Send blog
//type     public

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Discription is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Blog({
                title: req.body.title,
                description: req.body.description,
            })

            const blog = await newPost.save()
            res.json(blog)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
)

// @route   GET api/blogs
// @desc    Get all blogs

// @access  Private

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 })
        res.json(blogs)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})

// @route   GET api/blogs/:id
// @desc    Get all blogs

// @access  Private

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' })
        }

        res.json(blog)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog not found' })
        }

        console.log(err)

        res.status(500).send('Server error')
    }
})

// @route   DELETE api/blogs/:id
// @desc    Delete blog by id

// @access  Private

router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' })
        }

        //Check User

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User Not authorized' })
        }

        await blog.remove()

        res.json(blog)
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog not found' })
        }
        res.status(500).send('Server error')
    }
})

// @route   PUT api/blogs/like/:id
// @desc   PUT like on blog

// @access  Private

module.exports = router

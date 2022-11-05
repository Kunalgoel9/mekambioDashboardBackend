const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    socialMedia: [
        {
            name: String,
            link: String,
        },
    ],
})

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: AuthorSchema,
    blogimage: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },

    content: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
    metatags: [
        {
            type: String,
        },
    ],
    metadiscription: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = Blog = mongoose.model('blog', BlogSchema)

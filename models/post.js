const mongoose = require('mongoose')
const { Schema } = mongoose
const Comment = require('./comment')

const PostSchema = new Schema({
    userId: {type: Number},
    content: {type: String, required: true, minLength: 1, maxLength: 1500},
    comments: [Comment]
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post;
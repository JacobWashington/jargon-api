const mongoose = require('mongoose')
const { Schema } = mongoose

const Post = require('./post')

const UserProfileSchema = new Schema({
    userId: {type: Number, required: true},
    posts: [Post.schema]
})

const UserProfile = mongoose.model('UserProfile', UserProfileSchema)

module.exports = UserProfile
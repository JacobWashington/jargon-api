const mongoose = require('mongoose')
const { Schema } = mongoose;
const Post = require('./post')

const GroupSchema = new Schema({
    userId: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    members: {type: Array},
    posts: [Post]
})

const Group = mongoose.model('Group', GroupSchema)

module.exports = Group
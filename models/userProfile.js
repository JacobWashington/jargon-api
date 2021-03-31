const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserProfileSchema = new Schema({
    userId: {type: Number, required: true},
    posts: {type: Array}
})

const UserProfile = mongoose.model('UserProfile', UserProfileSchema)

module.exports = UserProfile
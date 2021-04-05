const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
    userId: {type: Number, required: true},
    content: {type: String, required: true, minLength: 1, maxLength: 500}
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
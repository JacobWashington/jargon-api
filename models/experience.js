const mongoose = require('mongoose')
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    employer: {type: Number, required: true},
    jobTitle: {type: String, required: true},
    summary: {type: String},
    dateStart: {type: Date, required: true, default: Date.now()},
    dateEnd: {type: Date},
})

const Experience = mongoose.model('Experience', ExperienceSchema)

module.exports = Experience
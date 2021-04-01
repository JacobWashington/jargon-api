const mongoose = require('mongoose')
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    employer: {type: String, required: true},
    jobTitle: {type: String, required: true},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date},
    summary: {type: String}
})

const Experience = mongoose.model('Experience', ExperienceSchema);

module.exports = Experience
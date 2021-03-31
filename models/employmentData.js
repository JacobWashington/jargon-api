const mongoose = require('mongoose')
const {Schema} = mongoose

const EmploymentDataSchema = new Schema({
    employer: {type: Number, required: true},
    jobTitle: {type: String, required: true},
    dateStart: {type: Date, required: true}
})

const EmploymentData = mongoose.model('EmploymentData', EmploymentDataSchema)

module.exports = EmploymentData
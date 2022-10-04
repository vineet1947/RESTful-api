const { default: mongoose } = require("mongoose");

const dataSchema = new mongoose.Schema({
    'name': {
        required: true,
        type: String

    },

    'age': {
        required: true,
        type: Number
    },

    'doctor_name': {
        required: true,
        type: String
    },

    'approved': {
        required: true,
        type: Boolean
    }

})

module.exports = mongoose.model('Data', dataSchema); 

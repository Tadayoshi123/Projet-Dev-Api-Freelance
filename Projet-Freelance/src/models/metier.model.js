const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    Nom :{
        type: String,
        required: true,
        maxLength: 200,
        minLength: 2
    },
});

module.exports = mongoose.model('Job', jobSchema);
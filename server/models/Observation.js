const mongoose = require('mongoose');

const observationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    latinName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt
});

const Observation = mongoose.model('Observation', observationSchema);

module.exports = Observation;

const mongoose = require('mongoose');

// Define the schema
const loadingSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    quantityPack: {
        type: Number,
        required: true
    },
    lashing: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    transporter: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    quantityLTR: {
        type: Number,
        required: true
    },
    usePly: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    numberBarrels: {
        type: Number,
        required: true
    },
    useSheet: {
        type: String,
        required: true
    }
});

// Create a model
const LoadingModel = mongoose.model('Loading', loadingSchema);

module.exports = LoadingModel;

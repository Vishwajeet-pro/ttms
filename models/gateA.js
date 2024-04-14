const mongoose = require('mongoose');

const gateASchema = new mongoose.Schema({
    gateEntryNo: {
        type: String,
        required: true
    },
    inwardType: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    reportingDNT: {
        type: Date,
        required: true
    },
    transporter: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    inDNT: {
        type: Date,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    tareWeight: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const gateAModel = mongoose.model('gateA', gateASchema);

module.exports = gateAModel;

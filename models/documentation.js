const mongoose = require('mongoose');

// Define schema
const documentationSchema = mongoose.Schema({
    vehicleNumber: {
        type: String,
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
    recieveDNT: {
        type: Date,
        required: true
    },
    invoiceStartDNT: {
        type: Date,
        required: true
    },
    invoiceEndDNT: {
        type: Date,
        required: true
    },
    shiftIncharge: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    driverMob: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Create model
const documentationModel = mongoose.model('documentation', documentationSchema);

module.exports = documentationModel;

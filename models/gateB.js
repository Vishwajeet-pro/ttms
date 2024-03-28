const mongoose = require('mongoose');

const gateBSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true
    },
    tareWeight: {
        type: Number,
        required: true
    },
    grossWeight: {
        type: Number,
        required: true
    },
    netWeight: {
        type: Number,
        required: true
    },
    outDNT: {
        type: Date,
        required: true
    },
    remark: {
        type: String,
        required: false
    }
});

const gateBModel = mongoose.model('gateB', gateBSchema);

module.exports = gateBModel;

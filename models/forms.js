const mongoose = require('mongoose');
const Schema = mongoose.Schema;

passengerSchema = new Schema({
    aadhar: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,

    },
    age: {
        type: Number,
        required: true,

    }
},
);


const formSchema = new Schema({

    emailId: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true
    },
    fromAddressLine1: {
        type: String,
        required: true
    },
    fromAddressLine2: {
        type: String,
        required: true
    },
    fromDistrict: {
        type: String,
        required: true
    },

    toAddressLine1: {
        type: String,
        required: true
    },
    toAddressLine2: {
        type: String,
        required: true
    },
    toDistrict: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    numberOfPassengers: {
        type: Number,
        required: true,
    },

    passengers: [passengerSchema],
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var Forms = mongoose.model('Form', formSchema);

module.exports = Forms;
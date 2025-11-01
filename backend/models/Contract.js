const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    sentienceScore: {
        type: Number,
        default: 0
    },
    experiencePoints: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contract', ContractSchema);
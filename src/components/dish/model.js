const { number } = require("joi");
const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    description: {
        type: String,
        required: true,
    },
    cuisine: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    restaurant: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("dishes", dishSchema);
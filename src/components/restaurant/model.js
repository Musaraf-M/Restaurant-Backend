const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    address: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    city: {
        type: String,
        required: true,
        min: 2,
        max: 255,
    },
    cuisine: {
        type: String,
        required: true
    },
    restaurantType: {
        type: String,
        required: true
    },
    dishes:{
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("restaurant", restaurantSchema);
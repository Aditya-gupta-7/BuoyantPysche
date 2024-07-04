const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    desc: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    photo: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    categories: {
        type: Array,
        default: []
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
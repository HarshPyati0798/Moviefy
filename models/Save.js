const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Save = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Save',Save);
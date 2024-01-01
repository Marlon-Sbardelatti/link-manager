const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    url: { type: String, require: true },
    views: { type: Number, default: 0 }
})

module.exports = mongoose.model('Link', linkSchema);

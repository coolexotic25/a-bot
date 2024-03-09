const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    unverified: {
        type: Array,
        default: []
    },
    email: {
        type: Array,
        default: []
    },
    phone: {
        type: Array,
        default: []
    }
});

const model = mongoose.model("bot accounts", schema);

module.exports = model;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pageSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    visits: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Page", pageSchema);
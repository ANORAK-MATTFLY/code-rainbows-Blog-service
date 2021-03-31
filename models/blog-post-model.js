const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        required: false,
    },
    tags: {
        type: [String]
    }
});

module.exports = mongoose.model("Post", postSchema);
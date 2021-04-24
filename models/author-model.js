const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    authorName: {
        type: String,
        required: true,
    },
    authorProfilePicture: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Author", AuthorSchema);
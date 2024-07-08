const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxLengh: 50
    },
    time: {
        type: Date,
        required: true
    }
})

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
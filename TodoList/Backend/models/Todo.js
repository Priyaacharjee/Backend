const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("todos", TodoSchema);

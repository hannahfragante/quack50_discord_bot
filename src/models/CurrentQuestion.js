const { Schema, model } = require("mongoose");

const currentQuestionSchema = new Schema({
    guild_id: {
        type: String,
        required: true,
    },
    channel_id: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    is_program_question: {
        type: Boolean,
        required: true,
    },
    program_question: {
        type: String,
        default: "",
    },
    choices: {
        type: Object,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    language:{
        type: String,
        required: true,
    },
    answered: {
        type: Boolean,
        default: false,
        required: true,
    },
});

module.exports = model("CurrentQuestion", currentQuestionSchema);

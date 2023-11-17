const { Schema, model } = require("mongoose");

const currentBattleQuestionSchema = new Schema({
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
    },
    choices: {
        type: Object,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

module.exports = model("CurrentBattleQuestion", currentBattleQuestionSchema);

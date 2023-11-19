const { Schema, model } = require("mongoose");

const messageCounterSchema = new Schema({
    guild_id: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        default: 1,
    },
    question_message_count_threshold:{
        type: Number,
        required: true,
    },
    question_message_count_threshold_counter:{
        type: Number,
        default: 0,
    },
    duck_message_count_threshold:{
        type: Number,
        required: true,
    },
    duck_message_count_threshold_counter:{
        type: Number,
        default: 0,
    },
});

module.exports = model("MessageCounter", messageCounterSchema);

const { Schema, model } = require("mongoose");

const currentDuckSchema = new Schema({
    guild_id: {
        type: String,
        required: true,
    },
    channel_id: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    caught: {
        type: Boolean,
        default: false,
    },
});

module.exports = model("CurrentDuck", currentDuckSchema);
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
});

module.exports = model("MessageCounter", messageCounterSchema);

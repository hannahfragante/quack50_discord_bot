const { Schema, model } = require("mongoose");

const duckSchema = new Schema({
    number: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    passive: {
        type: String,
        required: true,
    },
    base_damage: {
        type: Number,
        required: true,
    },
    base_recoil: {
        type: Number,
        default: 0,
    },
    base_tank_damage: {
        type: Number,
        default: 0,
    },
    base_hp: {
        type: Number,
        required: true,
    },
    base_heal: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

module.exports = model("Duck", duckSchema);

const { Schema, model } = require("mongoose");

const playerSchema = new Schema({
    player_id: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    hacker_title: {
        type: String,
        default: "BABY HACKER",
    },
    xp: {
        type: Number,
        default: 0,
    },
    xp_counter: {
        type: Number,
        default: 0,
    },
    questions_answered:{
        type: Number,
        default: 0,
    },
    battle_count:{
        type: Number,
        default: 0,
    },
    battles_won:{
        type: Number,
        default: 0,
    },
    ducks: {
        type: Array,
        default: [
            {
                name: "OG Duck",
                level: 1,
                duplicates: 0,
                active: true,
            },
        ],
    },
});

module.exports = model("Player", playerSchema);

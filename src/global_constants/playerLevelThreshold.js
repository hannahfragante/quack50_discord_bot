//so if ${player_level} <= ${upto_level} they need to earn ${xp_needed} xp to get to the next level...
//essentialy ${player.xp_counter} == ${xp_needed} to gain +1 level

//NOTE: it is important that this list in IN ORDER

module.exports = [
    {
        upto_level: 10,
        lower_bound: 1,
        upper_bound: 10,
        xp_needed: 20,
    },
    {
        upto_level: 20,
        lower_bound: 11,
        upper_bound: 20,
        xp_needed: 25,
    },
    {
        upto_level: 30,
        lower_bound: 21,
        upper_bound: 30,
        xp_needed: 30,
    },
    {
        upto_level: 50,
        lower_bound: 31,
        upper_bound: 50,
        xp_needed: 50,
    },
    {
        upto_level: 75,
        lower_bound: 51,
        upper_bound: 75,
        xp_needed: 40,
    },
    {
        upto_level: 100,
        lower_bound: 76,
        upper_bound: 999999,
        xp_needed: 100,
    },
];

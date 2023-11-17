const custom_commands = require("../../custom_commands/customCommands.js");
const { Client, Message, EmbedBuilder } = require("discord.js");
const Player = require("../../models/Player.js");
const Duck = require("../../models/Duck.js");
const duck_multipliers = require('../../global_constants/duckLevelMultiplier.js')
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */

module.exports = async (client, message) => {
    if (
        !message.author.bot &&
        message.content.split(" ")[0] === "dd" &&
        custom_commands["player_ducks"].includes(message.content.split(" ")[1])
    ) {
        console.log(
            "get player ducks from database",
            custom_commands["player_ducks"]
        );

        const query = {
            player_id: message.author.id,
        };

        try {
            const player = await Player.findOne(query);
            let playerDucks = [];

            if (player) {
                for (let i = 0; i < player.ducks.length; i++) {
                    let databaseDuck = await Duck.findOne({
                        name: player.ducks[i]["name"],
                    });
                    if (databaseDuck) {
                        let duckStats = {
                            number: 0,
                            name: "duck missing",
                            level: 0,
                            duplicates: 0,
                            hp: 0,
                            damage: 0,
                            recoil: 0,
                            tank_damage: 0,
                            heal: 0,
                            img: message.author.avatarURL(),
                        };

                        let level = player.ducks[i]["level"]
                        let multiplier = duck_multipliers[level.toString()];
                        
                        // if (level == 1) {
                        //     multiplier = 0;
                        // } else if (level == 2) {
                        //     multiplier = 0.2;
                        // } else if (level == 3) {
                        //     multiplier = 0.3;
                        // } else if (level == 4) {
                        //     multiplier = 0.5;
                        // } else if (level == 5) {
                        //     multiplier = 0.7;
                        // } else if (level >= 6) {
                        //     multiplier = 1;
                        // }
                        duckStats["number"] = databaseDuck.number;
                        duckStats["name"] = databaseDuck.name;
                        duckStats["level"] = level;
                        duckStats["duplicates"] = player.ducks[i]["duplicates"];
                        duckStats["hp"] =
                            databaseDuck.base_hp +
                            databaseDuck.base_hp * multiplier;
                        duckStats["damage"] =
                            databaseDuck.base_damage +
                            databaseDuck.base_damage * multiplier;
                        duckStats["recoil"] =
                            databaseDuck.base_recoil +
                            databaseDuck.base_recoil * multiplier;
                        duckStats["tank_damage"] =
                            databaseDuck.base_tank_damage +
                            databaseDuck.base_tank_damage * multiplier;
                        duckStats["heal"] =
                            databaseDuck.base_heal +
                            databaseDuck.base_heal * multiplier;
                        duckStats["img"] = databaseDuck.img;

                        playerDucks.push(duckStats);
                    }
                }
                // console.log(playerDucks);
                let duckEmbeds = [];
                for (let i = 0; i < playerDucks.length; i++) {
                    let embed = new EmbedBuilder()
                        .setTitle(playerDucks[i]["name"])
                        .setDescription(
                            `
                            **number**: ${playerDucks[i]["number"]}
                            **name**: ${playerDucks[i]["name"]}
                            **level**: ${playerDucks[i]["level"]}
                            **duplicates**: ${playerDucks[i]["duplicates"]}
                            **hp**: ${playerDucks[i]["hp"]}
                            **damage**: ${playerDucks[i]["damage"]}
                            **recoil**: ${playerDucks[i]["recoil"]}
                            **tank_damage**: ${playerDucks[i]["tank_damage"]}
                            **heal**: ${playerDucks[i]["heal"]}
                            `
                        )
                        .setColor("Random")
                        .setThumbnail(playerDucks[i]["img"]);

                    duckEmbeds.push(embed);
                }

                const howManyDucksEmbed = new EmbedBuilder()
                    .setTitle(
                        `You have ${playerDucks.length} ducks in your arsenal!`
                    )
                    .setDescription("check em out!");

                let allEmbeds = [howManyDucksEmbed].concat(duckEmbeds);
                message.channel.send({ embeds: allEmbeds });
            } else {
                message.channel.send(
                    "quack quack it appears you are not a registered hacker yet :( use the `dd -hacker` command to register yourself as a hacker and start answering qustions!"
                );
            }
        } catch (error) {
            console.log(`[1] Error in 07answerRandomQuestion.js: ${error}`);
        }
    }
};

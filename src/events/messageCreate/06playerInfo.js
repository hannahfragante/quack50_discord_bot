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
        custom_commands["information"].includes(message.content.split(" ")[1])
    ) {
        console.log("Player Info Attempt", custom_commands["information"]);

        const query = {
            player_id: message.author.id,
        };

        try {
            const player = await Player.findOne(query);

            if (player) {
                message.channel.send("here is you info!");

                // find active duck
                let activeDuck = {};
                for (let i = 0; i < player.ducks.length; i++) {
                    // console.log(player.ducks[i]);
                    if (player.ducks[i]["active"]) {
                        activeDuck = player.ducks[i];
                    }
                }

                const activeDuckDatabase = await Duck.findOne({
                    name: activeDuck["name"],
                });
                let img;
                let activeDuckStats = {
                    name: "duck missing",
                    level: 0,
                    hp: 0,
                    damage: 0,
                    recoil: 0,
                    tank_damage: 0,
                    heal: 0,
                    img: message.author.avatarURL(),
                };
                if (activeDuckDatabase) {
                    let level = activeDuck["level"]
                    let multiplier = duck_multipliers[level.toString()];

                    activeDuckStats["name"] = activeDuckDatabase.name;
                    activeDuckStats["level"] = level;
                    activeDuckStats["hp"] =
                        activeDuckDatabase.base_hp +
                        activeDuckDatabase.base_hp * multiplier;
                    activeDuckStats["damage"] =
                        activeDuckDatabase.base_damage +
                        activeDuckDatabase.base_damage * multiplier;
                    activeDuckStats["recoil"] =
                        activeDuckDatabase.base_recoil +
                        activeDuckDatabase.base_recoil * multiplier;
                    activeDuckStats["tank_damage"] =
                        activeDuckDatabase.base_tank_damage +
                        activeDuckDatabase.base_tank_damage * multiplier;
                    activeDuckStats["heal"] =
                        activeDuckDatabase.base_heal +
                        activeDuckDatabase.base_heal * multiplier;
                    activeDuckStats["img"] = activeDuckDatabase.img;

                    // img = activeDuckDatabase.img;
                }

                const playerInfo = new EmbedBuilder()
                    .setTitle(`${message.author.displayName}'s Hacker Profile`)
                    .setDescription("Keep hackin!")
                    .setColor("Random")
                    .setThumbnail(message.author.avatarURL())
                    .addFields(
                        {
                            name: "Level",
                            value: player.level.toString(),
                            inline: true,
                        },
                        {
                            name: "Title",
                            value: player.hacker_title,
                            inline: true,
                        },
                        {
                            name: "Current EXP",
                            value: player.xp.toString(),
                            inline: true,
                        },
                        {
                            name: "Questions Answred",
                            value: player.questions_answered.toString(),
                            inline: true,
                        },
                        {
                            name: "Hack Offs Won",
                            value: player.battles_won.toString(),
                            inline: true,
                        },
                        {
                            name: "# of Hack Offs",
                            value: player.battle_count.toString(),
                            inline: true,
                        },
                        {
                            name: "Active Duck",
                            value: `${activeDuckStats["name"]}\nlevel: ${activeDuckStats["level"]}\nhp: ${activeDuckStats["hp"]}\nduplicates: ${activeDuck["duplicates"]}\ndamage: ${activeDuckStats["damage"]}\nrecoil: ${activeDuckStats["recoil"]}\ntank damage: ${activeDuckStats["tank_damage"]}\nheal: ${activeDuckStats["heal"]}`,
                        }
                    )
                    .setImage(activeDuckStats["img"]);

                message.channel.send({ embeds: [playerInfo] });
            } else {
                message.channel.send(
                    "quack quack it appears you are not a registered hacker yet :( use the `dd -hacker` command to register yourself as a hacker and start answering qustions!"
                );
            }
        } catch (error) {
            console.log(`[1] Error in 06answerRandomQuestion.js: ${error}`);
        }
    }
};

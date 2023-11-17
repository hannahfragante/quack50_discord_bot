const custom_commands = require("../../custom_commands/customCommands.js");
const { Client, Message, EmbedBuilder } = require("discord.js");
const Duck = require("../../models/Duck.js");
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
        custom_commands["ducks"].includes(message.content.split(" ")[1])
    ) {
        console.log("get ducks from database", custom_commands["ducks"]);

        try {
            const ducks = await Duck.find({});

            let duckEmbeds = [];
            for (let i = 0; i < ducks.length; i++) {
                let embed = new EmbedBuilder()
                    .setTitle(ducks[i]["name"])
                    .setDescription(
                        `
                        ***number***: ${ducks[i]["number"]}
                        ***passive***: ${ducks[i]["passive"]}
                        ***base hp***: ${ducks[i]["base_hp"]}
                        ***base damage***: ${ducks[i]["base_damage"]}
                        ***base heal***: ${ducks[i]["base_heal"]}
                        ***base recoil***: ${ducks[i]["base_recoil"]}
                        ***base tank damage***: ${ducks[i]["base_tank_damage"]}
                        `
                    )
                    .setThumbnail(ducks[i]["img"])
                    .setColor("Random");
                duckEmbeds.push(embed);
            }
            message.channel.send({ embeds: duckEmbeds });
        } catch (error) {
            console.log(`[1] Error in 08answerRandomQuestion.js: ${error}`);
        }
    }
};

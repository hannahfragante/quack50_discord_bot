const custom_commands = require("../../custom_commands/customCommands.js");
const { Client, Message } = require("discord.js");
const Player = require("../../models/Player.js");
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
        custom_commands["new_player"].includes(message.content.split(" ")[1])
    ) {
        console.log("New Player Attempt", custom_commands["new_player"]);

        const query = {
            player_id: message.author.id,
        };

        try {
            const player = await Player.findOne(query);

            if (player) {
                message.channel.send(
                    `You are already a player! quack! Use \`dd -info\` to check your information! quack`
                );
            } else {
                // create new player
                const newPlayer = new Player({
                    player_id: message.author.id,
                });

                await newPlayer.save();
                message.channel.send(
                    `WELCOME! quack! Use \`dd -info\` to check your information! quack`
                );
                console.log("new player created");
            }
        } catch (error) {
            console.log(`[1] Error in 04answerRandomQuestion.js: ${error}`);
        }
    }
};

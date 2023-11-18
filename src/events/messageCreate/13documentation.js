const { Client, Message, EmbedBuilder } = require("discord.js");
const custom_commands = require("../../custom_commands/customCommands.js");
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
        custom_commands["quack50"].includes(message.content.split(" ")[1])
    ) {
        console.log("quack50 Attempt", custom_commands["quack50"]);

        const embed = new EmbedBuilder()
            .setTitle(`quack50's DOCUMENTATION!`)
            .setDescription(`Github: https://github.com/hannahfragante/quack50_discord_bot`)
            .setColor('Yellow')
            .setThumbnail(`https://i.imgur.com/tvD6y07.png`)

        message.channel.send({embeds:[embed]})
    }
}
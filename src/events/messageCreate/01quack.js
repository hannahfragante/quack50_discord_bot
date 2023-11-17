const { Client, Message } = require("discord.js");
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */

module.exports = (client, message) => {
    if (message.content === "quack") {
        if (message.author.bot) {
            return;
        }
        message.channel.send(`quack`);
    }
};

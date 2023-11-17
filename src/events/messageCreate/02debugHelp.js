const quackMaker = require("../../utils/quackMaker.js");
const custom_commands = require("../../custom_commands/customCommands.js");
const { Client, Message } = require("discord.js");
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */

module.exports = (client, message) => {
    let quacks = [
        "quack quack?",
        "QUACK?!",
        "quack quack quack ...",
        "quack!",
        "quack quack quack quack",
        "quack :)",
        "quack quack ;)",
        "quack quack ^_^",
        quackMaker(),
    ];

    let all_custom_commands = [];
    for (const custom_command in custom_commands) {
        all_custom_commands = all_custom_commands.concat(
            custom_commands[custom_command]
        );
    }

    if (
        message.content.split(" ")[0] === "dd" &&
        !all_custom_commands.includes(message.content.split(" ")[1])
    ) {
        let random = Math.floor(Math.random() * quacks.length);
        message.channel.send(quacks[random]);
        // console.log(quackMaker());
    }
};

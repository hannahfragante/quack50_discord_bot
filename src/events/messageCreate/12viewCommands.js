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
        custom_commands["commands"].includes(message.content.split(" ")[1])
    ) {
        console.log("list Commands Attempt", custom_commands["commands"]);

        const embed = new EmbedBuilder()
            .setTitle("All of quack50's commands")
            .setDescription(`all of thse commands are used like this: \`dd <command>\` where \`<command>\` are any of these list of commands:`)
            .setColor("Yellow")
            .addFields(
                {
                    name: `SPECIAL DEBUGGER QUACK command`,
                    value:`
                    quack50's bread and butter ask quack50 debugging questions to help you figure out your coding problems!
                    ***command:*** \`dd <anything you wanna ask quack50 to help you debug :)>\`
                    `
                },
                {
                    name: `ANSWER commands`,
                    value:`
                    The answer commands is for answering randomly popped coding questions by quack50 in the server
                    NOTE: this command is used as follows: \`dd <command> <answer to a question>\`
                    ***commands:*** ${commands_to_string(custom_commands.answer)}
                    `
                },
                {
                    name: `INFORMATION commands`,
                    value:`
                    The information commands is for looking at your info
                    ***commands:*** ${commands_to_string(custom_commands.information)}
                    `
                },
                {
                    name: `NEW PLAYER commands`,
                    value:`
                    The new player commands is for registering new hackers in quak50's database
                    ***commands:*** ${commands_to_string(custom_commands.new_player)}
                    `
                },
                {
                    name: `PLAYER DUCKS commands`,
                    value:`
                    The player ducks commands is to see all the ducks you have tamed
                    ***commands:*** ${commands_to_string(custom_commands.player_ducks)}
                    `
                },
                {
                    name: `DUCKS commands`,
                    value:`
                    The ducks commands is to see all the ducks in the database
                    ***commands:*** ${commands_to_string(custom_commands.ducks)}
                    `
                },
                {
                    name: `CHANGE ACTIVE DUCK commands`,
                    value:`
                    The change active duck commands is to  change hacker's current active duck to use for quackoffs!
                    NOTE: this command is used as follows: \`dd <command> <duck number>\` to figure out your duck's number use \`dd -myducks\`
                    ***commands:*** ${commands_to_string(custom_commands.change_active_duck)}
                    `
                },
                {
                    name: `TAME commands`,
                    value:`
                    The tame duck commands is to  tame wild ducks!
                    NOTE: this command is used as follows: \`dd <command> <duck name>\`
                    ***commands:*** ${commands_to_string(custom_commands.tame)}
                    `
                },
                {
                    name: `COMMANDS commands`,
                    value:`
                    this commands is used to show all of quack50's commands!
                    ***commands:*** ${commands_to_string(custom_commands.commands)}
                    `
                },
                {
                    name: `quack50 command`,
                    value:`
                    this commands is used to send a link to quack50's documentation!
                    ***commands:*** ${commands_to_string(custom_commands.quack50)}
                    `
                },
                {
                    name: `***SLASH COMMANDS***`,
                    value:`
                    This command is to initiate a quackoff with someone
                    \`/quackoff <target-user>\` where \`<target-user>\` is another valid player
                    \`/quack\` just quack's back :)
                    `
                },
            )

            message.channel.send({embeds:[embed]})
    }


}

function commands_to_string(commands){
    let final_string='';
    commands.forEach((command) => {
        final_string += `\`${command}\` `
    })

    return final_string
}   
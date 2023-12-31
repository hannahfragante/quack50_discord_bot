const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    name: "ban",
    description: "bans member from server!",
    //devOnly: Boolean,
    //testOnly: Boolean,
    deleted: true,
    options: [
        {
            name: "target-user",
            description: "the user u want to ban",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: "reason",
            description: "the reason for banning",
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
    callback: (client, interaction) => {
        interaction.reply(`ban...`);
    },
};

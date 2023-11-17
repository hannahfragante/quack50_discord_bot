module.exports = {
    name: "quack",
    description: "Pong!",
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],
    //deleted: Boolean,
    callback: (client, interaction) => {
        interaction.reply(`quack quack! ${client.ws.ping}ms`);
    },
};

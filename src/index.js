require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async () => {
    try {
        console.log(`🔃 connecting to database...`);
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`📚 Succesfully connected to database!`);

        eventHandler(client);
        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(error);
    }
})();

// eventHandler(client);

// client.login(process.env.TOKEN);

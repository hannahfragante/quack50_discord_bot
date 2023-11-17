const custom_commands = require("../../custom_commands/customCommands.js");
const { Client, Message, EmbedBuilder } = require("discord.js");
const Player = require("../../models/Player.js");
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
        custom_commands["change_active_duck"].includes(
            message.content.split(" ")[1]
        )
    ) {
        console.log(
            "change active duck",
            custom_commands["change_active_duck"]
        );

        const query = {
            player_id: message.author.id,
        };

        try {
            const player = await Player.findOne(query);

            let newDuckArray = [];
            for (let i = 0; i < player.ducks.length; i++) {
                let duck = {
                    name: "",
                    level: 0,
                    duplicates: 0,
                    active: false,
                };
                duck["name"] = player.ducks[i]["name"];
                duck["level"] = player.ducks[i]["level"];
                duck["duplicates"] = player.ducks[i]["duplicates"];
                duck["active"] = player.ducks[i]["active"];
                newDuckArray.push(duck);
            }

            if (player) {
                let duckNumber = message.content.split(" ")[2];

                if (duckNumber) {
                    if (isPositiveInteger(duckNumber)) {
                        let duckNumberInt = parseInt(duckNumber);
                        if (duckNumberInt <= player.ducks.length) {
                            for (let i = 0; i < player.ducks.length; i++) {
                                let duckDatabase = await Duck.findOne({
                                    name: player.ducks[i]["name"],
                                });
                                if (duckNumber === duckDatabase.number) {
                                    // console.log("make true");
                                    // player.ducks[i]["active"] = true;
                                    // await player.save();
                                    newDuckArray[i]["active"] = true;
                                } else {
                                    // player.ducks[i]["active"] = false;
                                    // await player.save();
                                    // console.log("make false");
                                    newDuckArray[i]["active"] = false;
                                }
                            }

                            player.ducks = newDuckArray;
                            await player.save();
                            // console.log(newDuckArray);
                            message.channel.send(
                                `changed your active duck to ${duckNumber}!`
                            );
                        } else {
                            message.channel.send(
                                "quack quack you dont have that duck :("
                            );
                        }
                    } else {
                        message.channel.send("quack quack invalid input :(");
                    }
                } else {
                    message.channel.send(
                        "quack quack what duck do u want to make active?"
                    );
                }
            } else {
                message.channel.send(
                    "quack quack it appears you are not a registered hacker yet :( use the `dd -hacker` command to register yourself as a hacker and start answering qustions!"
                );
            }
        } catch (error) {
            console.log(`Error in 09changeActiveDuck.js: ${error}`);
        }
    }
};

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

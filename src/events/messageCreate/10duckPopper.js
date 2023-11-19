const { Client, Message, EmbedBuilder } = require("discord.js");
const custom_commands = require("../../custom_commands/customCommands.js");
const Player = require("../../models/Player.js");
const MessageCounter = require("../../models/MessageCounter.js");
const single_constants = require("../../global_constants/singleConstants.js");
const CurrentDuck = require("../../models/CurrentDuck.js");
const Duck = require("../../models/Duck.js")
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */

module.exports = async (client, message) => {
    // send duck very n messages
    // const n = single_constants["duck_popper_n"];
    const n = single_constants["question_popper_n"];
    const duck_n = single_constants["duck_popper_n"];
    let random_n = Math.ceil(Math.random() * n)
    let random_duck_n = Math.ceil(Math.random() * duck_n)

    let all_custom_commands = [];
    for (const custom_command in custom_commands) {
        all_custom_commands = all_custom_commands.concat(
            custom_commands[custom_command]
        );
    }

    //should only work for real users (no bots)
    //and if message is not a custom bot command
    if (
        !message.author.bot &&
        !(message.content.split(" ")[0] === "dd") &&
        !all_custom_commands.includes(message.content.split(" ")[1])
    ){
        const messageCountQuery = {
            guild_id: message.guild.id,
        }

        const currentDuckQuery = {
            guild_id: message.guild.id,
            channel_id: message.channel.id
        }

        try {
            const messageCount = await MessageCounter.findOne(messageCountQuery)
            const currentDuckDatabase = await CurrentDuck.findOne(currentDuckQuery)
            const allDucksDatabase = await Duck.find({})
            let newRandomDuck = allDucksDatabase[Math.floor(Math.random() * allDucksDatabase.length)];

            let current_message_count;
            let current_threshold_count;
            let current_threshold;

            if (messageCount){

                current_message_count = messageCount.count;
                current_threshold = messageCount.duck_message_count_threshold
                current_threshold_count = messageCount.duck_message_count_threshold_counter + 1

                messageCount.count += 1;
                messageCount.duck_message_count_threshold_counter += 1

                await messageCount.save();


                // if (messageCount.count % n == 0){
                if (current_threshold_count == current_threshold) {
                    messageCount.duck_message_count_threshold = random_duck_n
                    messageCount.duck_message_count_threshold_counter = 0
                    messageCount.save()
                    
                    //if there is a currentduck in the database
                    if (currentDuckDatabase){
                        //get current duck info from the database
                        let currentDuck;
                        for (let i = 0; i < allDucksDatabase.length; i++){
                            if (currentDuckDatabase.number === allDucksDatabase[i].number ){
                                currentDuck = allDucksDatabase[i]
                            }
                        }

                        //if the duck in the database is not yer caught
                        if (!currentDuckDatabase.caught){
                            message.channel.send(`it seems there is still an untamed duck!`)
                            const currentDuckEmbed = new EmbedBuilder()
                                .setTitle(`A wild ${currentDuck.name} has appeared!`)
                                .setDescription(`To tame it type \`dd -tame ${currentDuck.name}\``)
                                .setColor('Random')
                                .setImage(currentDuck.img)

                            message.channel.send({embeds:[currentDuckEmbed]})
                        }else{
                            //if the duck in the current duck database has been caught
                            //save new duck in the current duck database
                            currentDuckDatabase.number = newRandomDuck.number
                            currentDuckDatabase.caught = false
                            await currentDuckDatabase.save()

                            const newRandomDuckEmbed = new EmbedBuilder()
                                .setTitle(`A wild ${newRandomDuck.name} has appeared!`)
                                .setDescription(`To tame it type \`dd -tame ${newRandomDuck.name}\``)
                                .setColor('Random')
                                .setImage(newRandomDuck.img)

                            message.channel.send({embeds:[newRandomDuckEmbed]})
                        }


                    }else{
                        //if there is currently no duck in the database, put a duck there
                        const newDuckEmbed = new EmbedBuilder()
                            .setTitle(`A wild ${newRandomDuck.name} has appeared!`)
                            .setDescription(`To tame it type \`dd -tame ${newRandomDuck.name}\``)
                            .setColor('Random')
                            .setImage(newRandomDuck.img)

                        const newDuck = new CurrentDuck({
                            guild_id: message.guild.id,
                            channel_id: message.channel.id,
                            number: newRandomDuck.number
                        })

                        await newDuck.save()

                        message.channel.send({embeds:[newDuckEmbed]})

                    }

                }

            }else{
                //create new count
                const newCount = new MessageCounter({
                    guild_id: message.guild.id,
                    question_message_count_threshold: random_n,
                    duck_message_count_threshold: random_duck_n
                });
                current_message_count = 0
                current_threshold_count = 0
                current_threshold = random_duck_n

                await newCount.save();
                console.log("new count created");
                console.log(`🔴No message counter in database (10duckPopper.js)`)
            }

        } catch (error) {
            console.log(`🔴Error in 10duckPopper.js: ${error}`)
        }
    }
}
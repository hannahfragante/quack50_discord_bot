const { Client, Message, EmbedBuilder } = require("discord.js");
const custom_commands = require("../../custom_commands/customCommands.js");
const Player = require("../../models/Player.js");
const single_constants = require("../../global_constants/singleConstants.js");
const CurrentDuck = require("../../models/CurrentDuck.js");
const Duck = require("../../models/Duck.js")
const duck_multipliers = require('../../global_constants/duckLevelMultiplier.js')
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
        custom_commands["tame"].includes(message.content.split(" ")[1])
    ) {
        console.log("Tame Attempt", custom_commands["tame"]);

        const playerQuery = {
            player_id: message.author.id
        }
        const currentDuckQuery = {
            guild_id: message.guild.id,
            channel_id: message.channel.id
        }

        try {
            const player = await Player.findOne(playerQuery)
            const currentDuckDatabase = await CurrentDuck.findOne(currentDuckQuery)
            const allDucksDatabase = await Duck.find({})
            const tameAttempt = message.content.split(" ").slice(2).join(" ")

            if (player){

                if (!currentDuckDatabase.caught){
                    //get duck details
                    let currentDuck;
                    for (let i = 0; i < allDucksDatabase.length; i++){
                        if (currentDuckDatabase.number === allDucksDatabase[i]['number']){
                            currentDuck = allDucksDatabase[i]
                        }
                    }

                    // if answer is correct
                    if (tameAttempt.toLocaleLowerCase() === currentDuck['name'].toLocaleLowerCase()){
                        // console.log(`tamed ${currentDuck['name']}`)

                        //TODO:check player ducks if they already have this duck
                            //if they do, +1 to duplicate
                            //if not add tot their ducks

                        //adding duck to plaer ducks format:
                        // {
                        //     name: "OG Duck",
                        //     level: 1,
                        //     duplicates: 0,
                        //     active: true,
                        // },
                        
                        let playerDucks = player.ducks
                        let playerDuckIndex = -1;
                        let alreadyHasDuck = false;
                        for (let i = 0; i < playerDucks.length; i++){
                            if (currentDuck['name'] === playerDucks[i]['name']){
                                
                                playerDuckIndex = i;
                                alreadyHasDuck = true;

                                console.log(`player already has a/an ${currentDuck['name']} at index ${playerDuckIndex}`)

                            }
                        }

                        let random = Math.ceil(Math.random() * 3)
                        if (random == 2){
                            console.log(`random`, random)

                            if (alreadyHasDuck){

                                let duck = playerDucks[playerDuckIndex]
                                if (duck['level'] <= 6){
                                    duck['level'] += 1
                                }
                                duck['duplicates'] += 1
                                playerDucks.splice(playerDuckIndex, 1, duck)
                                console.log(playerDucks)
    
                            }else{
                                let duck_builder = {
                                    name: 'placeholder',
                                    level: 1,
                                    duplicates: 0,
                                    active: false
                                }
                                duck_builder['name'] = currentDuck['name']
                                playerDucks.push(duck_builder)
                                console.log(playerDucks)
                            }

                            // update player ducks database
                            player.ducks = playerDucks
                            await player.save()
                            //change current duck database caught to true 
                            currentDuckDatabase.caught = true
                            await currentDuckDatabase.save()

                            message.channel.send(`Congratulations you successfully tamed a ${currentDuck['name']}!`)

                        }else{
                            console.log(`random`, random)
                            console.log(playerDucks)
                            message.channel.send(`It seems this ${currentDuck['name']} is having doubts being tamed by you, try again!`)
                        }

                    }else{
                        message.channel.send("quack quack that is the wrong name quack >:(");
                    }


                }else{
                    message.channel.send("quack quack there aren't any ducks to tame quack");
                }
                
            }else{
                message.channel.send(
                    "quack quack it appears you are not a registered hacker yet :( use the `dd -hacker` command to register yourself as a hacker and start answering qustions!"
                );
            }
            
        } catch (error) {
            console.log(`Error in 11duckTamer.js: ${error}`)
        }
    }
}
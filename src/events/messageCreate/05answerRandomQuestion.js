const custom_commands = require("../../custom_commands/customCommands.js");
const { Client, Message, EmbedBuilder } = require("discord.js");
const CurrentQuestion = require("../../models/CurrentQuestion.js");
const difficulty_xp = require("../../global_constants/difficultyXp.js");
const player_title_thresholds = require("../../global_constants/playerTitleThresholds.js");
const player_level_thresholds = require("../../global_constants/playerLevelThreshold.js");
const Player = require("../../models/Player.js");
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
        custom_commands["answer"].includes(message.content.split(" ")[1])
    ) {
        console.log("Answer Attempt", custom_commands["answer"]);

        const currentQuestionQuery = {
            guild_id: message.guild.id,
            channel_id: message.channel.id,
        };
        const currentPlayerQuery = {
            player_id: message.author.id,
        };

        try {
            const currentQuestion = await CurrentQuestion.findOne(
                currentQuestionQuery
            );
            const player = await Player.findOne(currentPlayerQuery);

            //TODO: if correct player geins exp and check if they have leveled up

            //Check if player exist
            if (player) {
                //get the current question
                if (currentQuestion) {
                    answerList = message.content.split(" ");
                    // check if user input had an answer choice
                    if (answerList[2]) {
                        // check if user answer input is correct
                        const parsed_answer = answerList.slice(2).join(" ")
                        if (parsed_answer === currentQuestion.answer) {
                            // TODO: update player xp and/or level and title
                            // TODO: change currentQuestion answered to true

                            // do checks
                            //add xp to player then save to database
                            player.xp +=
                                difficulty_xp[currentQuestion.difficulty];
                            player.xp_counter +=
                                difficulty_xp[currentQuestion.difficulty];
                            await player.save();

                            //check if player gained a level or 2
                            for ( let i = 0; i < player_level_thresholds.length; i++ ) {
                                // find right checking level thresholds
                                if ( player.level >= player_level_thresholds[i][ "lower_bound" ] && player.level <= player_level_thresholds[i][ "upper_bound" ] ) {
                                    console.log(
                                        `player level--> ${player_level_thresholds[i]["lower_bound"]} >= ${player.level} <= ${player_level_thresholds[i]["upto_level"]}`
                                    );

                                    //do checks here
                                    //check how many levels player gained
                                    if ( player.xp_counter >= player_level_thresholds[i]["xp_needed"] ) {
                                        //just in case there is bleeding
                                        let levels_gained = Math.floor( player.xp_counter / player_level_thresholds[i][ "xp_needed" ] );
                                        player.level += levels_gained;
                                        await player.save();

                                        //reset counter if needed
                                        // if (levels_gained > 0) {
                                        player.xp_counter = player.xp_counter % player_level_thresholds[i][ "xp_needed" ];
                                        await player.save();
                                        // }

                                        if(levels_gained > 0){
                                            // send bot message to channel
                                            const embed = new EmbedBuilder()
                                                .setTitle(`Leveled up to level ${player.level}!`)
                                                .setDescription(`Congratulations ${message.author.displayName}!`)
                                                .setColor('Random')
                                                .setThumbnail(message.author.avatarURL())
                                            message.channel.send({embeds: [embed]})
                                            
                                        }
  
                                    }
                                    //check if title needs to be updated
                                    let title_threshold_array = []
                                    for (title in player_title_thresholds) {
                                        if ( player.level >= player_title_thresholds[title][ "level" ] ) {
                                            title_threshold_array.push(player_title_thresholds[title])
                                        }
                                    }
                                    // change title too
                                    let previous_title = player.hacker_title
                                    let final_title = title_threshold_array.pop()
                                    player.hacker_title = final_title['name']
                                    await player.save();

                                    if (!(previous_title === final_title['name'])){
                                        const embed = new EmbedBuilder()
                                            .setTitle(`Title changed to ${player.hacker_title}!`)
                                            .setDescription(`Congratulations ${message.author.displayName}!`)
                                            .setColor('Random')
                                            .setThumbnail(message.author.avatarURL())
                                        message.channel.send({embeds: [embed]})                                        
                                    }

                                }
                            }
                            //update #questions answred by player
                            player.questions_answered += 1
                            await player.save()
                            //updater current question in database to answered=true
                            currentQuestion.answered = true;
                            // save databse
                            await currentQuestion.save();

                            //send channel messge that the user answered the question correctly
                            message.channel.send(
                                `Correct! Dr. Malan would be proud! And you gained \`${
                                    difficulty_xp[currentQuestion.difficulty]
                                } exp\`! quack`
                            );
                        } else {
                            message.channel.send("Wrong! Try again! quack");
                        }
                    } else {
                        message.channel.send(
                            "Maybe try answering the question? quack"
                        );
                    }
                } else {
                    message.channel.send("There is no question to answer...");
                }
                // ---
            } else {
                message.channel.send(
                    "quack quack it appears you are not a registered hacker yet :( use the `dd -hacker` command to register yourself as a hacker and start answering qustions!"
                );
            }

            // if (currentQuestion) {
            //     answerList = message.content.split(" ");
            //     if (answerList[2]) {
            //         if (answerList[2] === currentQuestion.answer) {
            //             message.channel.send(
            //                 `Correct! Dr. Malan would be proud! And you gained \`${
            //                     difficulty_xp[currentQuestion.difficulty]
            //                 } exp\`! quack`
            //             );
            //         } else {
            //             message.channel.send("Wrong! Try again! quack");
            //         }
            //     } else {
            //         message.channel.send(
            //             "Maybe try answering the question? quack"
            //         );
            //     }
            // }else{
            //     message.channel.send(
            //         "There is no question to answer..."
            //     );
            // }
        } catch (error) {
            console.log(`[1] Error in 05answerRandomQuestion.js: ${error}`);
        }
    }
};

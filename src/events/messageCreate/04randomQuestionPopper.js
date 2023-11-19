const { Client, Message, EmbedBuilder } = require("discord.js");
const pythonQuestions = require("../../global_constants/questions/pythonQuestions.js");
const cQuestions = require("../../global_constants/questions/cQuestions.js");
const javascriptQuestions = require("../../global_constants/questions/javascriptQuestions.js");
const custom_commands = require("../../custom_commands/customCommands.js");
const Player = require("../../models/Player.js");
const MessageCounter = require("../../models/MessageCounter.js");
const CurrentQuestion = require("../../models/CurrentQuestion.js");
const difficulty_xp = require("../../global_constants/difficultyXp.js");
const single_constants = require("../../global_constants/singleConstants.js");
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */

module.exports = async (client, message) => {
    // send message very n messages
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
    ) {
        const questions = [pythonQuestions, cQuestions, javascriptQuestions];
        //chooses 1 random set of questions above
        let randomLanguage = Math.floor(Math.random() * 3);
        // chooses random question from chosen question set, right now there are only 5 questions each
        let randomQuestion = Math.floor(Math.random() * questions[randomLanguage]["questions"].length);

        let chosenQuestion =
            questions[randomLanguage]["questions"][randomQuestion];
        let choices = [];
        for (const choice in chosenQuestion["choices"]) {
            let buildOption = [];
            buildOption.push(choice + ")");
            buildOption.push(chosenQuestion["choices"][choice]);
            choices.push(buildOption.join(" "));
        }

        //create embbed for the question
        let questionEmbed;
        if (chosenQuestion["is_program_question"]) {
            let programWithChoices = [
                "```",
                "----------------------",
                chosenQuestion["program_question"],
                "----------------------",
                "```",
                choices.join("\n"),
            ];
            questionEmbed = new EmbedBuilder()
                .setTitle("Think Fast!")
                .setDescription("A new question has popped up!")
                .setColor("Yellow")
                .addFields(
                    {
                        name: "Language",
                        value: chosenQuestion["language"],
                        inline: true,
                    },
                    {
                        name: "Difficulty",
                        value: chosenQuestion["difficulty"],
                        inline: true,
                    },
                    {
                        name: "EXP given",
                        value: difficulty_xp[
                            chosenQuestion["difficulty"]
                        ].toString(),
                        inline: true,
                    },
                    {
                        name: chosenQuestion["question"],
                        value: programWithChoices.join("\n"),
                    },
                    {
                        name: `\nHow to answer`,
                        value: `
                        *Multiple Choice:* \`dd -answer <letter>\` WITHOUT the \`<>\`
                        *Free Response/output*: \`dd -answer <output>\` WITHOUT the \`<>\``
                    }
                );
        } else {
            questionEmbed = new EmbedBuilder()
                .setTitle("Think Fast!")
                .setDescription("A new question has popped up!")
                .setColor("Yellow")
                .addFields(
                    {
                        name: "Language",
                        value: chosenQuestion["language"],
                        inline: true,
                    },
                    {
                        name: "Difficulty",
                        value: chosenQuestion["difficulty"],
                        inline: true,
                    },
                    {
                        name: "EXP given",
                        value: difficulty_xp[
                            chosenQuestion["difficulty"]
                        ].toString(),
                        inline: true,
                    },
                    {
                        name: chosenQuestion["question"],
                        value: choices.join("\n"),
                    },
                    {
                        name: `\nHow to answer`,
                        value: `
                        *Multiple Choice:* \`dd -answer <letter>\` WITHOUT the \`<>\`
                        *Free Response/output*: \`dd -answer <output>\` WITHOUT the \`<>\``
                    }
                );
        }

        

        //check the message count of the server
        // add 1 to database message count
        const queryMessageCount = {
            guild_id: message.guild.id,
        };

        let current_message_count;
        let current_threshold_count;
        let current_threshold;
        let messageCountOutside;

        try {
            const messageCount = await MessageCounter.findOne(
                queryMessageCount
            );

            messageCountOutside = messageCount

            if (messageCount) {
                current_message_count = messageCount.count;
                current_threshold = messageCount.question_message_count_threshold
                current_threshold_count = messageCount.question_message_count_threshold_counter + 1

                messageCount.count += 1;
                messageCount.question_message_count_threshold_counter += 1

                await messageCount.save();
            } else {
                //create new count
                const newCount = new MessageCounter({
                    guild_id: message.guild.id,
                    question_message_count_threshold: random_n,
                    duck_message_count_threshold: random_duck_n
                });
                current_message_count = 0
                current_threshold_count = 0
                current_threshold = random_n

                await newCount.save();
                console.log("new count created");
            }
        } catch (error) {
            console.log(`Error in 03randomQuestionPopper.js ${error}`);
        }

        // check if there is already a question in the channel (database)
        // if there is send the same question
        // if not send a new question
        const queryCurrentQuestion = {
            guild_id: message.guild.id,
            channel_id: message.channel.id,
        };

        try {
            const currentQuestion = await CurrentQuestion.findOne(
                queryCurrentQuestion
            );

                

            // send a question every n messages
            // if (current_message_count % n == 0) {
            if (current_threshold_count == current_threshold) {
                messageCountOutside.question_message_count_threshold = random_n
                messageCountOutside.question_message_count_threshold_counter = 0
                messageCountOutside.save()

                if (currentQuestion && !currentQuestion.answered) {
                    //make the question embed for the unanswered question
                    //create embbed for the question

                    let currentChoices = [];
                    for (const choice in currentQuestion.choices) {
                        let buildOption = [];
                        buildOption.push(choice + ")");
                        buildOption.push(currentQuestion.choices[choice]);
                        currentChoices.push(buildOption.join(" "));
                    }

                    //create embbed for the question
                    let currentQuestionEmbed;
                    if (currentQuestion.is_program_question) {
                        let currentProgramWithChoices = [
                            "```",
                            "----------------------",
                            currentQuestion.program_question,
                            "----------------------",
                            "```",
                            currentChoices.join("\n"),
                        ];
                        currentQuestionEmbed = new EmbedBuilder()
                            .setTitle("Think Fast!")
                            .setDescription("A new question has popped up!")
                            .setColor("Yellow")
                            .addFields(
                                {
                                    name: "Language",
                                    value: currentQuestion.language,
                                    inline: true,
                                },
                                {
                                    name: "Difficulty",
                                    value: currentQuestion.difficulty,
                                    inline: true,
                                },
                                {
                                    name: "EXP given",
                                    value: difficulty_xp[
                                        currentQuestion.difficulty
                                    ].toString(),
                                    inline: true,
                                },
                                {
                                    name: currentQuestion.question,
                                    value: currentProgramWithChoices.join("\n"),
                                },
                                {
                                    name: `\nHow to answer`,
                                    value: `
                                    *Multiple Choice:* \`dd -answer <letter>\` WITHOUT the \`<>\`
                                    *Free Response/output*: \`dd -answer <output>\` WITHOUT the \`<>\``
                                }
                            );
                    } else {
                        currentQuestionEmbed = new EmbedBuilder()
                            .setTitle("Think Fast!")
                            .setDescription("A new question has popped up!")
                            .setColor("Yellow")
                            .addFields(
                                {
                                    name: "Language",
                                    value: currentQuestion.language,
                                    inline: true,
                                },
                                {
                                    name: "Difficulty",
                                    value: currentQuestion.difficulty,
                                    inline: true,
                                },
                                {
                                    name: "EXP given",
                                    value: difficulty_xp[
                                        currentQuestion.difficulty
                                    ].toString(),
                                    inline: true,
                                },
                                {
                                    name: currentQuestion.question,
                                    value: currentChoices.join("\n"),
                                },
                                {
                                    name: `\nHow to answer`,
                                    value: `
                                    *Multiple Choice:* \`dd -answer <letter>\` WITHOUT the \`<>\`
                                    *Free Response/output*: \`dd -answer <output>\` WITHOUT the \`<>\``
                                }
                            );
                    }

                    //send current question to discord every n messages
                    // if (current_message_count % n == 0) {
                    message.channel.send(
                        "There's still an unanswered question!"
                    );
                    message.channel.send({
                        embeds: [currentQuestionEmbed],
                    });
                    // }
                } else if (currentQuestion && currentQuestion.answered) {
                    // if answer is answered in the database
                    // update the database to the new question's values

                    currentQuestion.question = chosenQuestion["question"];
                    currentQuestion.is_program_question =
                        chosenQuestion["is_program_question"];
                    currentQuestion.program_question =
                        chosenQuestion["program_question"];
                    currentQuestion.choices = chosenQuestion["choices"];
                    currentQuestion.answer = chosenQuestion["answer"];
                    currentQuestion.difficulty = chosenQuestion["difficulty"];
                    currentQuestion.language = chosenQuestion["language"];
                    currentQuestion.answered = false;

                    // send the new question for every n messages in a channel
                    // if (current_message_count % n == 0) {
                    message.channel.send({ embeds: [questionEmbed] });
                    // }

                    //save to database
                    await currentQuestion.save();
                    console.log("new current question updated");
                } else if (!currentQuestion) {
                    //if no question in the database
                    // send new question
                    // and put in database
                    const newCurrentQuestion = new CurrentQuestion({
                        guild_id: message.guild.id,
                        channel_id: message.channel.id,
                        question: chosenQuestion["question"],
                        is_program_question:
                            chosenQuestion["is_program_question"],
                        program_question: chosenQuestion["program_question"],
                        choices: chosenQuestion["choices"],
                        answer: chosenQuestion["answer"],
                        difficulty: chosenQuestion["difficulty"],
                        difficulty: chosenQuestion["language"],
                    });

                    // send the new question for every n messages in a channel
                    // if (current_message_count % n == 0) {
                    message.channel.send({ embeds: [questionEmbed] });
                    // }

                    //save to database
                    await newCurrentQuestion.save();
                    console.log("new current question created");
                }
            }
        } catch (error) {
            console.log(
                `Error in 03randomQuestionPopper.js ${error} making new question`
            );
        }

        // send a question for ever 10 messages in a channel
        // if (current_message_count % 10 == 0) {
        //     message.channel.send("hello!");
        //     message.channel.send({ embeds: [questionEmbed] });
        // }
    }
};

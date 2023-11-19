const {Client, Interaction, ApplicationCommandOptionType, EmbedBuilder} = require('discord.js')
const Player = require("../../models/Player.js");
const Duck = require("../../models/Duck.js")
const duck_multipliers = require('../../global_constants/duckLevelMultiplier.js')
const duck_battle_prompts = require('../../global_constants/duckBattlePrompts.js')

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        // TODO: check if the person initiated is a hacker
        // TODO: check if the target-user is a hacker
        // TODO: check if there is currently a battle state for this channel in the database {guild_id channel_id players:[list of 2 players]}
        //          - there can only be 1 battle per channel
        // TODO: check if either of the contestants is in an existing battle {battles:[list of channel ids], players:[list of uer ids]}
        //          - all players can only be in one battle at a time
        // TODO: if passed all checks above
        //          - wait for the target user to respond if they accept or deny the challenge
        //              > if the deny, return
        //              > if they accept, start a new battle state
        /*** 
         *  Battle is gonna be RNG cuz im too lazy to code logic lmao
         *
         * 
         *   - declare winner
         *   - battle FINISHED
         *   
         * 
         * ***/
        const targetUser = interaction.options.get('target-user')

        const initiator_query = {
            player_id: interaction.user.id
        }

        const target_user_query = {
            player_id: targetUser.value
        }
        
        await interaction.deferReply()

        try {

            const initiator = await Player.findOne(initiator_query)
            const target_user = await Player.findOne(target_user_query)
            const all_ducks_database = await Duck.find({})

            if (!initiator){
                await interaction.editReply(`quack Sorry!, You are not a hacker so you cant initiate hackoffs. Use \`dd -hacker\` command to register yourself as a hacker.` )
                return;   
            }

            if (interaction.user.id === targetUser.value){
                await interaction.editReply(`quack you cant fight with yourself cmon now` )
                return; 
            }

            if(!target_user){
                await interaction.editReply(`quack Sorry!, Your chosen opponent is not a hacker!`)
                return;
            }

            let random = Math.ceil(Math.random() * 2)
            if (random != 2){
                await interaction.editReply(`quack Sorry!, the Duck Gods favors your chosen enemy. They will be spared for now. Try again another time.`)
                return;
            }

            await interaction.editReply(`The Duck Gods approve of this battle. It will start shortly please wait`)

            initiator.battle_count += 1
            target_user.battle_count +=1
            await initiator.save()
            await target_user.save()

            // const time = 2000;
            const timer = (time) => {
                return new Promise((resolve) => setTimeout(resolve, time));
            }
            // await timer(time);
            
            //get player active ducks
            const initiator_active = initiator.ducks.filter((duck) => duck.active)[0]
            const target_user_active = target_user.ducks.filter((duck) => duck.active)[0]
            // console.log(initiator_active)
            // console.log(target_user_active)

            // get duck stats
            // console.log(all_ducks_database)
            let initiator_active_base_stats = all_ducks_database.filter((duck) => duck.name === initiator_active.name)[0]
            let target_user_active_base_stats = all_ducks_database.filter((duck) => duck.name === target_user_active.name)[0]
            // console.log(initiator_active_base_stats)
            // console.log(target_user_active_base_stats)

            let initiator_duck = {
                name: initiator_active.name,
                level: initiator_active.level,
                hp: Math.ceil(initiator_active_base_stats.base_hp * duck_multipliers[initiator_active.level.toString()]), 
                damamge: Math.ceil(initiator_active_base_stats.base_damage * duck_multipliers[initiator_active.level.toString()]),
                recoil: Math.ceil(initiator_active_base_stats.base_recoil * duck_multipliers[initiator_active.level.toString()]),
                tank_damge: Math.ceil(initiator_active_base_stats.base_recoil * duck_multipliers[initiator_active.level.toString()]),
                heal: Math.ceil(initiator_active_base_stats.base_heal * duck_multipliers[initiator_active.level.toString()]),
                img: initiator_active_base_stats.img
            }

            let target_user_duck = {
                name: target_user_active.name,
                level: target_user_active.level,
                hp: Math.ceil(target_user_active_base_stats.base_hp * duck_multipliers[target_user_active.level.toString()]), 
                damamge: Math.ceil(target_user_active_base_stats.base_damage * duck_multipliers[target_user_active.level.toString()]),
                recoil: Math.ceil(target_user_active_base_stats.base_recoil * duck_multipliers[target_user_active.level.toString()]),
                tank_damge: Math.ceil(target_user_active_base_stats.base_recoil * duck_multipliers[target_user_active.level.toString()]),
                heal: Math.ceil(target_user_active_base_stats.base_heal * duck_multipliers[target_user_active.level.toString()]),
                img: target_user_active_base_stats.img
            }

            await timer(2000);
            interaction.channel.send(`+---------------------------------------+\n+      **THE QUACK OFF HAS BEGUN**      +\n+---------------------------------------+`)

            let start_hp = `\`${interaction.member.nickname ? interaction.member.nickname : interaction.user.globalName}'s ${initiator_duck.name}\` hp: ${initiator_duck.hp}\n\`${targetUser.nickname ? targetUser.nickname : targetUser.user.globalName}'s ${target_user_duck.name}\` hp: ${target_user_duck.hp}`
            interaction.channel.send(start_hp)

            let attacker;
            let attacked;
            while (!(initiator_duck.hp <= 0 || target_user_duck.hp <=0)){
                if (Math.ceil(Math.random() * 2) == 1){
                    initiator_duck.hp = initiator_duck.hp - target_user_duck.damamge + initiator_duck.tank_damge + initiator_duck.heal
                    target_user_duck.hp = target_user_duck.hp - target_user_duck.recoil
                    attacker = `\`${targetUser.member.nickname ? targetUser.member.nickname : targetUser.user.globalName}'s ${target_user_duck.name}\` `
                    attacked = `\`${interaction.member.nickname ? interaction.member.nickname : interaction.user.globalName}'s ${initiator_duck.name}\` `
                    await timer(1000)
                    let battle_prompt = `-------\n${duck_battle_prompts(attacker, attacked)}`
                    interaction.channel.send(battle_prompt)
                    let hp_update = `\`${interaction.member.nickname ? interaction.member.nickname : interaction.user.globalName}'s ${initiator_duck.name}\` hp: ${initiator_duck.hp}\n\`${targetUser.nickname ? targetUser.nickname : targetUser.user.globalName}'s ${target_user_duck.name}\` hp: ${target_user_duck.hp}`
                    interaction.channel.send(`${hp_update}\n-------`)
                }else{
                    target_user_duck.hp = target_user_duck.hp - initiator_duck.damamge + target_user_duck.tank_damge + target_user_duck.heal
                    initiator_duck.hp = initiator_duck.hp - initiator_duck.recoil
                    attacked = `\`${targetUser.member.nickname ? targetUser.member.nickname : targetUser.user.globalName}'s ${target_user_duck.name}\` `
                    attacker = `\`${interaction.member.nickname ? interaction.member.nickname : interaction.user.globalName}'s ${initiator_duck.name}\` `
                    await timer(1000)
                    let battle_prompt = `-------\n${duck_battle_prompts(attacker, attacked)}`
                    interaction.channel.send(battle_prompt)
                    let hp_update = `\`${interaction.member.nickname ? interaction.member.nickname : interaction.user.globalName}'s ${initiator_duck.name}\` hp: ${initiator_duck.hp}\n\`${targetUser.nickname ? targetUser.nickname : targetUser.user.globalName}'s ${target_user_duck.name}\` hp: ${target_user_duck.hp}`
                    interaction.channel.send(`${hp_update}\n-------`)
                }
            }

            let winner_database;
            let winner_name;
            let winner_duck;
            let winner_duck_stats;
            if (initiator_duck.hp <= 0){
                winner_database = target_user
                winner_name = targetUser.member.nickname ? targetUser.member.nickname : targetUser.user.globalName
                winner_duck = target_user_duck.name
                winner_duck_stats = target_user_duck
                console.log(`target-user won`)
            }else{
                winner_database = initiator
                winner_name = interaction.member.nickname ? interaction.member.nickname : interaction.user.globalName
                winner_duck = initiator_duck.name
                winner_duck_stats = initiator_duck
                console.log(`initiator won`)
            }

            winner_database.battles_won += 1
            await winner_database.save()

            const embed = new EmbedBuilder()
                .setTitle(`Congratulations ${winner_name}!`)
                .setDescription(`your friendship with ${winner_duck} has grown!`)
                .setThumbnail(`${winner_duck_stats.img}`)

            interaction.channel.send(`-------\nIN THIS CONCLUSIVE QUACK OFF, \`${winner_name}\`'s \`${winner_duck}\` CAME OUT VICTORIOUS!\n-------`) 
            interaction.channel.send({embeds:[embed]}) 

            
            
        } catch (error) {
            console.log(`Error in hackoff.js ${error}`)
        }

        // interaction.reply(`quack started a hackoff with ${targetUser.user.globalName}`);
        // console.log(interaction.user.id)
    },
    name: "quackoff",
    description: "initiate a hack off with another user",
    options: [
        {
            name: 'target-user',
            description: 'user you want your duck to have a QUACK OFF with',
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        }
    ]

};
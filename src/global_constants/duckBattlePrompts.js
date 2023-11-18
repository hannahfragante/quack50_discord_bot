module.exports = (attacker, attacked) => {
    let prompts = [
        `${attacked} was drinking tea, so they didnt see ${attacker} attack them`,
        `${attacked} managed to dodge an attack from ${attacker} and launched a counter attack`,
        `${attacker} tricked ${attacked} into drinking poisonous boba`,
        `${attacker} quacked at ${attacked} so loud ${attacked} took damage from the loudness`,
        `${attacker} used emotional trauma ${attacked} takes damage`,
        `${attacker} riddled ${attacked} with a nearly impossible coding question, it's brain got fried`,
        `${attacked} lost on a 1 v 1 in valorant against ${attacker} and it hurt their pride.`,
        `While running to attack ${attacker}, ${attacked} slipped and took damage`,
        `${attacked} lost against a rap battle with ${attacker} and took damage cuz it hurt its pride`
    ]

    let random = Math.floor(Math.random() * prompts.length)

    return prompts[random]
};

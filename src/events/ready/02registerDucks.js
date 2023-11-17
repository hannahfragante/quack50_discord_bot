// the sole purpose of this file is to add ducks to the database
const Duck = require("../../models/Duck.js");

module.exports = async () => {
    let duckKeys = [
        "number",
        "name",
        "passive",
        "base_hp",
        "base_damage",
        "base_recoil",
        "base_tank_damage",
        "base_heal",
        "img",
    ];
    let newDuck;
    try {
        //do this block of code for every new duck

        //OG DUCK
        // ---------------------------------------------------------------------
        newDuck = "OG Duck";
        const ogDuckQuery = {
            name: newDuck,
        };

        let newOgDuckBuilder = {
            number: "1",
            name: newDuck,
            passive:
                "OG Duck is mostly busy with helping hackers debug their code but if needed in the battle field, he's always present!\n OG Duck does 5 damage per correct question answer!",
            base_hp: 20,
            base_damage: 5,
            base_recoil: 0,
            base_tank_damage: 0,
            base_heal: 0,
            img: "https://i.imgur.com/tvD6y07.png",
        };

        const ogDuck = await Duck.findOne(ogDuckQuery);
        if (ogDuck) {
            for (let i = 0; i < duckKeys.length; i++) {
                // console.log(duckKeys[i], ogDuck[duckKeys[i]]);
                if (ogDuck[duckKeys[i]] !== newOgDuckBuilder[duckKeys[i]]) {
                    // console.log(duckKeys[i], "different");
                    ogDuck[duckKeys[i]] = newOgDuckBuilder[duckKeys[i]];
                    await ogDuck.save();
                    console.log(
                        `🔀🦆 ${newDuck} ${duckKeys[i]} has been updated`
                    );
                }
            }
        } else {
            const newOgDuck = new Duck({
                number: newOgDuckBuilder["number"],
                name: newDuck,
                passive: newOgDuckBuilder["passive"],
                base_hp: newOgDuckBuilder["base_hp"],
                base_damage: newOgDuckBuilder["base_damage"],
                base_recoil: newOgDuckBuilder["base_recoil"],
                base_tank_damage: newOgDuckBuilder["base_tank_damage"],
                base_heal: newOgDuckBuilder["base_heal"],
                img: newOgDuckBuilder["img"],
            });

            await newOgDuck.save();
            console.log(`➕🦆 ${newDuck} added to database`);
        }
        // ---------------------------------------------------------------------

        //ANGEL DUCK
        // ---------------------------------------------------------------------
        newDuck = "Angel Duck";
        const angelDuckQuery = {
            name: newDuck,
        };

        let newAngelDuckBuilder = {
            number: "2",
            name: newDuck,
            passive:
                "Angel Duck are always watching hackers who code for humanity's well being!\nAngel Duck does 7 damage but heals 3 hp per correctly answered question in battle",
            base_hp: 20,
            base_damage: 7,
            base_recoil: 0,
            base_tank_damage: 0,
            base_heal: 3,
            img: "https://i.imgur.com/lkJIxmG.png",
        };

        const angelDuck = await Duck.findOne(angelDuckQuery);
        if (angelDuck) {
            for (let i = 0; i < duckKeys.length; i++) {
                if (
                    angelDuck[duckKeys[i]] !== newAngelDuckBuilder[duckKeys[i]]
                ) {
                    angelDuck[duckKeys[i]] = newAngelDuckBuilder[duckKeys[i]];
                    await angelDuck.save();
                    console.log(
                        `🔀🦆 ${newDuck} ${duckKeys[i]} has been updated`
                    );
                }
            }
        } else {
            const newAngelDuck = new Duck({
                number: newAngelDuckBuilder["number"],
                name: newDuck,
                passive: newAngelDuckBuilder["passive"],
                base_hp: newAngelDuckBuilder["base_hp"],
                base_damage: newAngelDuckBuilder["base_damage"],
                base_recoil: newAngelDuckBuilder["base_recoil"],
                base_tank_damage: newAngelDuckBuilder["base_tank_damage"],
                base_heal: newAngelDuckBuilder["base_heal"],
                img: newAngelDuckBuilder["img"],
            });

            await newAngelDuck.save();
            console.log(`➕🦆 ${newDuck} added to database`);
        }
        // ---------------------------------------------------------------------

        //DEVIL DUCK
        // ---------------------------------------------------------------------
        newDuck = "Devil Duck";
        const devilDuckQuery = {
            name: newDuck,
        };

        let newDevilDuckBuilder = {
            number: "3",
            name: newDuck,
            passive:
                "Devil Duck is a mischievous one! It always laughs at troll programs hackers make. \nDevil Duck does 10 dmg with recoil of 3 damage",
            base_hp: 20,
            base_damage: 10,
            base_recoil: 3,
            base_tank_damage: 0,
            base_heal: 0,
            img: "https://i.imgur.com/PCtaG0O.png",
        };

        const devilDuck = await Duck.findOne(devilDuckQuery);
        if (devilDuck) {
            for (let i = 0; i < duckKeys.length; i++) {
                if (
                    devilDuck[duckKeys[i]] !== newDevilDuckBuilder[duckKeys[i]]
                ) {
                    devilDuck[duckKeys[i]] = newDevilDuckBuilder[duckKeys[i]];
                    await devilDuck.save();
                    console.log(
                        `🔀🦆 ${newDuck} ${duckKeys[i]} has been updated`
                    );
                }
            }
        } else {
            const newDevilDuck = new Duck({
                number: newDevilDuckBuilder["number"],
                name: newDuck,
                passive: newDevilDuckBuilder["passive"],
                base_hp: newDevilDuckBuilder["base_hp"],
                base_damage: newDevilDuckBuilder["base_damage"],
                base_recoil: newDevilDuckBuilder["base_recoil"],
                base_tank_damage: newDevilDuckBuilder["base_tank_damage"],
                base_heal: newDevilDuckBuilder["base_heal"],
                img: newDevilDuckBuilder["img"],
            });

            await newDevilDuck.save();
            console.log(`➕🦆 ${newDuck} added to database`);
        }
        // ---------------------------------------------------------------------
    } catch (error) {
        console.log(`[1] Error creating ducks (02registerDucks.js): ${error}`);
    }

    console.log(`🦆 Registered Ducks`);
};

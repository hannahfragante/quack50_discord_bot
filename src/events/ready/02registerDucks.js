// the sole purpose of this file is to add ducks to the database
const Duck = require("../../models/Duck.js");
const ducks = require('../../global_constants/ducks/ducks.js')

module.exports = async () => {

    try {

        ducks.forEach(async (duck) => {

            let duck_query = {
                name: duck.name
            }

            let duck_database = await Duck.findOne(duck_query);

            let new_duck = {
                number: duck.number,
                name: duck.name,
                passive: duck.passive,
                base_hp: duck.base_hp,
                base_damage: duck.base_damage,
                base_recoil: duck.base_recoil,
                base_tank_damage: duck.base_tank_damage,
                base_heal: duck.base_heal,
                img: duck.img,
            };

            if (duck_database){
                for (duck_key in new_duck){
                    
                    if (duck_database[duck_key] !== new_duck[duck_key]){
                        
                        duck_database[duck_key] = new_duck[duck_key]
                        console.log(`🔀🦆 ${new_duck.name} ${duck_key} has been updated`);
                        await duck_database.save()
                        
                        
                    }
                }
            }else{
                const new_duck_database = new Duck(new_duck)
                console.log(`➕🦆 ${new_duck.name} added to database`);
                await new_duck_database.save() 
            }
        })


    } catch (error) {
        console.log(`[1] Error creating ducks (02registerDucks.js): ${error}`);
    }

    console.log(`🦆 Registered Ducks`);
};

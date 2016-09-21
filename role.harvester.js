var helpers = require('global.helpers');

var roleHarvester = {
    create: function() {
        var tiers = [
            {body:[WORK,CARRY,MOVE]}
        ];

        _.forEach(tiers, function(tier){
            if(Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {role: 'harvester'}) == OK) {
                var name = Game.spawns.Spawn1.createCreep(tier.body, undefined, {role: 'harvester'});
                console.log("Spawning Harvester, " + name);
            }
        });
    },
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(energy)
            {
                creep.say('pickup');
                if(creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy);
                }
            }
            else {
                // Going to let you fix it. Good night!
                //creep.harvest vs creep.withdraw
                var container = helpers.findClosestContainer(creep);
                if(container) {
                    var result = creep.withdraw(container, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    } else if (result != OK) {
                        creep.say(result);
                    }
                }
                else {
                    var source = helpers.findSource(creep);
                    var result = creep.harvest(source, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    } else if (result != OK) {
                        creep.say(result);
                    }
                }


                //if(!container) container = helpers.findSource(creep);
                // var result = creep.harvest(container, RESOURCE_ENERGY);
                // console.log(JSON.stringify(container));
                // if(result == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(container);
                // } else if (result != OK) {
                //     creep.say(result);
                // }
            }
        }
        else {
            creep.say('deliver');
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;

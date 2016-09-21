var helpers = require('global.helpers');

var roleBuilder = {
    create: function() {
        var tiers = [
            {body:[WORK,CARRY,MOVE]}
        ];

        _.forEach(tiers, function(tier){
            if(Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {role: 'builder'}) == OK) {
                var name = Game.spawns.Spawn1.createCreep(tier.body, undefined, {role: 'builder'});
                console.log("Spawning Builder, " + name);
            }
        });
    },
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        /*var container = helpers.findClosestContainer(creep);
	        if (!container) creep.say('404-Container');
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }*/



            var container = helpers.findClosestContainer(creep);
                if(container) {
                    //sometimes creeps are returning -6 result???
                    //console.log(JSON.stringify(container))
                    var result = creep.withdraw(container, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    } else if (result != OK) {
                        creep.say("c");
                    }
                }
                else {
                    var source = helpers.findSource(creep);
                    var result = creep.harvest(source, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    } else if (result != OK) {
                        creep.say("s");
                    }
                }
	    }
	}
};

module.exports = roleBuilder;

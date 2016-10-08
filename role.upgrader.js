var helpers = require('global.helpers');

var roleUpgrader = {
    create: function() {
        var tiers = [
            {body:[WORK,CARRY,MOVE]},
            {body:[WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]},
            {body:[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {body:[WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]},
            {body:[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]}
        ];

        _.forEach(tiers, function(tier){
            if(Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {role: 'upgrader'}) == OK) {
                var name = Game.spawns.Spawn1.createCreep(tier.body, undefined, {role: 'upgrader'});
                console.log("Spawning Upgrader, " + name);
            }
        });
    },
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                //creep.placeRoadUnderMe();
            }
        }
        else {
          var container = creep.findClosestContainerWithEnergy();
          if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
              //creep.placeRoadUnderMe();
          }
        }
	}
};

module.exports = roleUpgrader;

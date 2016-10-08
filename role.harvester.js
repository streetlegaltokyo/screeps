var helpers = require('global.helpers');
var roleUpgrader = require('role.upgrader');

var roleHarvester = {
    create: function() {
        var tiers = [
            { body: [CARRY, CARRY, MOVE, MOVE] },
            { body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE] },
            { body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] },
            ];

        _.forEach(tiers, function(tier) {
            if (Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {
                    role: 'harvester'
                }) == OK) {
                var name = Game.spawns.Spawn1.createCreep(tier.body, undefined, {
                    role: 'harvester'
                });
                console.log("Spawning Harvester, " + name);
            }
        });
    },
    run: function(creep) {
        if(creep.carry.energy > 0) {
            var target = creep.findClosestPlaceToDumpEnergy();
            if (target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else if(creep.carry.energy == 0) {
            var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (energy && creep.targetIsInRange(energy, 4)) {
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy);
                }
            } else {
                var container = creep.findClosestContainerWithEnergy();
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        } else {
            roleUpgrader.run(creep);
        }
    }
};

module.exports = roleHarvester;

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');
var roleMelee = require('role.melee');
var roleRanged = require('role.ranged');
var roleExplorer = require('role.explorer');
var roleClaimer = require('role.claimer');
var towerStructure = require('structure.tower');
var helpers = require('global.helpers');
var creepExtensions = require('creep.extensions');
var towerExtensions = require('tower.extensions');

module.exports.loop = function() {
    creepExtensions.register();
    towerExtensions.register();
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee');
    var ranged = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranged');
    var explorers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorer');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
    var needsRepairCount = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: function(s) {
            return s.hits < (s.hitsMax * .7)
        }
    }).length;
    var hostileCreepsCount = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS).length;

    // if(hostileCreepsCount > 0 && melees.length < 2) {
    //     roleMelee.create();
    // }
    // if(hostileCreepsCount > 0 && ranged.length < 4) {
    //   roleRanged.create();
    // }
    if (claimers.length < 0) {
        roleClaimer.create();
    }
    if (miners.length < 4) {
        roleMiner.create();
    } else if (harvesters.length < 2) {
        roleHarvester.create();
    } else if (upgraders.length < 6) {
        roleUpgrader.create();
    } else if (builders.length < 1 && Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        roleBuilder.create();
    } else if (repairers.length < 1 && needsRepairCount > 0) {
        roleRepairer.create();
    } else if (explorers.length < 3) {
        roleExplorer.create();
    }

    if (needsRepairCount == 0) {
        _.forEach(repairers, function(repairer) {
            repairer.suicide();
        });
    }

    if (Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length == 0) {
        _.forEach(builders, function(builder) {
            builder.suicide();
        });
    }


    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'melee') {
            roleMelee.run(creep);
        }
        if (creep.memory.role == 'ranged') {
            roleRanged.run(creep);
        }
        if (creep.memory.role == 'explorer') {
            roleExplorer.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
    }

    _.forEach(towers, function(tower) {
        towerStructure.run(tower);
    })
}

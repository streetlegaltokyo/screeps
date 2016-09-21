var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');
var roleMelee = require('role.melee');
var helpers = require('global.helpers');
var creepExtensions = require('creep.extensions');

module.exports.loop = function () {
    creepExtensions.run();
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee');

    if(melees.length < 1 && Game.getObjectById('57cb5c0b1ba46da95cd26d54')) {
        roleMelee.create();
    }

    if(miners.length < 2) {
        roleMiner.create();
    }

    if(harvesters.length < 2) {
        roleHarvester.create();
    }

    if(upgraders.length < 2) {
        roleUpgrader.create();
    }

    if(builders.length < 2 && Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        roleBuilder.create();
    }
    else if (Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length == 0) {
        _.forEach(builders, function(builder) { builder.suicide(); });
    }

    var needsRepairCount = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: function(s){return s.hits < (s.hitsMax*.7) && s.structureType != STRUCTURE_WALL}}).length;
    if(repairers.length < 1 && needsRepairCount > 0){
        roleRepairer.create();
    }
    else if (needsRepairCount == 0) {
        _.forEach(repairers, function(repairer){ repairer.suicide(); });
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'melee') {
            roleMelee.run(creep);
        }
    }
}
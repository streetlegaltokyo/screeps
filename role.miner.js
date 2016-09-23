var helpers = require('global.helpers');

var findSourceToHarvest = function(creep) {
    var sources = creep.findSources();
    var name = creep.room.name;
    var mySources = [];
    _.forEach(sources, function(s) {
        var x = s.pos.x - 1;
        var y = s.pos.y - 1;
        var positions = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var pos = new RoomPosition(x, y, name);
                var structures = pos.lookFor(LOOK_STRUCTURES);
                var hasStructureObstacle = _.any(structures,
                    function(structure) {
                        return _.filter(OBSTACLE_OBJECT_TYPES,
                            function(obstacle) {
                                return obstacle == structure.structureType;
                            }).length > 0;
                    }
                );

                var terrains = pos.lookFor(LOOK_TERRAIN);
                var hasTerrainObstacle = _.any(terrains,
                    function(structure) {
                        return _.filter(OBSTACLE_OBJECT_TYPES,
                            function(obstacle) {
                                return obstacle == structure;
                            }).length > 0;
                    }
                );

                var creeps = pos.lookFor(LOOK_CREEPS);
                var hasCreepObstacle = creeps.length > 0;

                var position = {
                    x: x,
                    y: y,
                    structures: structures,
                    terrains: terrains,
                    hasObstacle: hasStructureObstacle || hasTerrainObstacle
                };
                positions.push(position);
                x++;
            }
            x = s.pos.x - 1;
            y++;
        }

        var minersAtSpawn = _.filter(Game.creeps, function(c) {
            return c.memory.targetSourceId == s.id
        }).length;
        var spacesAtSpawnAvailable = _.filter(positions, function(p) {
            return !p.hasObstacle
        }).length;
        var shouldSpawn = minersAtSpawn < spacesAtSpawnAvailable
        mySources.push([{
            source: s,
            shouldSpawn: shouldSpawn
        }]);
    });
    //console.log(JSON.stringify(mySources));

    var sourcesWithSpaces = _.filter(mySources, function(ms) { return s.shouldSpawn});

    return sourcesWithSpaces[0] ? sourcesWithSpaces[0] : null;
};

var roleMiner = {
    create: function() {
        var tiers = [{
            body: [WORK, CARRY, MOVE]
        }, {
            body: [WORK, WORK, CARRY, MOVE]
        }, {
            body: [WORK, WORK, WORK, CARRY, MOVE]
        }, {
            body: [WORK, WORK, WORK, WORK, CARRY, MOVE]
        }, {
            body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
        }, {
            body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
        }];

        _.forEach(tiers, function(tier) {
            if (Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {
                    role: 'miner'
                }) == OK) {
                var name = Game.spawns.Spawn1.createCreep(tier.body, undefined, {
                    role: 'miner'
                });
                console.log("Spawning Miner, " + name);
            }
        });
    },
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var source = null;
            if (creep.memory.targetSourceId) {
                source = Game.getObjectById(creep.memory.targetSourceId);
            } else {
                source = findSourceToHarvest(creep);
                creep.memory.targetSourceId = source ? source.id : null;
            }

            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var container = creep.findClosestContainerThatIsNotFull();
            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }
};



module.exports = roleMiner;

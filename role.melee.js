var helpers = require('global.helpers');

var meleeBuilder = {
    create: function(spawn) {
        var tiers = [{
            body: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE]
        }, {
            body: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE]
        }, {
            body: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE]
        }];

        var body = null;
        _.forEach(tiers, function(tier) {
            if (spawn.canCreateCreep(tier.body, undefined, {
                    role: 'melee'
                }) == OK) {
                body = tier.body;
            }
        });
        var name = spawn.createCreep(body, undefined, {
            role: 'melee',
            home: spawn.room.name
        });
        if (name) console.log("Spawning Attacker, " + name);
    },
    run: function(creep) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        // else if (!target) {
        //     creep.moveTo(creep.room.controller);
        // }
    }
};

module.exports = meleeBuilder;

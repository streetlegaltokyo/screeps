var rangedBuilder = {
    create: function() {
        var tiers = [{
            body: [RANGED_ATTACK, MOVE]
        }, {
            body: [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE]
        }, {
            body: [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE]
        }];

        var body = null;
        _.forEach(tiers, function(tier) {
            if (Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {
                    role: 'ranged'
                }) == OK) {
                body = tier.body;
            }
        });
        var name = Game.spawns.Spawn1.createCreep(body, undefined, {
            role: 'ranged'
        });
        if (name) console.log("Spawning Ranged Attacker, " + name);
    },
    run: function(creep) {
        var target = creep.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (!target) {
            creep.moveTo(creep.room.controller);
        }
    }
};

module.exports = rangedBuilder;

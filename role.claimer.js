var claimerBuilder = {
    create: function() {
        var tiers = [{
            body: [CLAIM,MOVE]
        }];

        var body = null;
        _.forEach(tiers, function(tier) {
            if (Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {
                    role: 'claimer'
                }) == OK) {
                body = tier.body;
            }
        });
        var name = Game.spawns.Spawn1.createCreep(body, undefined, {
            destination: 'W56S68',
            role: 'claimer'
        });
        if (name) console.log("Spawning Claimer, " + name);
    },
    run: function(creep) {
      if (creep.room.name != creep.memory.destination) {
          creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.destination)));
      } else {
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
      }
    }
};

module.exports = claimerBuilder;

var helpers = require('global.helpers');

var meleeBuilder = {
    create: function() {
        var tiers = [
            {body:[ATTACK,ATTACK,MOVE]}
        ];

        _.forEach(tiers, function(tier){
            if(Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, {role: 'melee'}) == OK) {
                var name = Game.spawns.Spawn1.createCreep(tier.body, undefined, {role: 'melee'});
                console.log("Spawning Attacker, " + name);
            }
        });
    },
    run: function(creep) {
        var target = Game.getObjectById('57cb5c20c48201443139abc9');
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
	}
};

module.exports = meleeBuilder;

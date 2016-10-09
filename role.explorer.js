var roleExplorer = {
    create: function() {
        var tiers = [{
            body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        }, {
            body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }, {
            body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }];

        var body = null;
        _.forEach(tiers, function(tier) {
            if (Game.spawns.Spawn1.canCreateCreep(tier.body, undefined, { role: 'explorer', targetSourceId: '57ef9d0c86f108ae6e60d2c5' }) == OK) {
                body = tier.body;
            }
        });
        var name = Game.spawns.Spawn1.createCreep(body, undefined, {role: 'explorer', targetSourceId: '57ef9d0c86f108ae6e60d2c5'});
        if(name) console.log("Spawning Explorer, " + name);
    },
    run: function(creep) {
      if (creep.carry.energy < creep.carryCapacity) {
          var source = null;
          if (creep.memory.targetSourceId) {
              source = Game.getObjectById(creep.memory.targetSourceId);
          }

          if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
              creep.moveTo(source);
          }
      } else {
          var container = creep.findClosestContainerThatIsNotFull();
          if (container && creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
          }
          else if (!container) {
              var target = creep.findClosestPlaceToDumpEnergy();
              if (target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target);
              }
          }
      }
    }
};



module.exports = roleExplorer;

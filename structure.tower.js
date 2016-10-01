var tower = {
  run: function(tower) {
    var creep = tower.findClosestHostileCreep();
    if (creep) {
      tower.attack(creep);
      return OK;
    };

    // var structure = tower.findClosestStructureNeedingRepair();
    // if (structure) {
    //   tower.repair(structure);
    //   return OK;
    // }
  }
};

module.exports = tower;

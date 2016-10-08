var tower = {
  run: function(tower) {
    var creep = tower.findClosestHostileCreep();
    if (creep) {
      tower.attack(creep);
      return OK;
    };

    //var structure = tower.findClosestStructureNeedingRepair();
    if(tower.energy > 500) {
        var structure = tower.findWeakestStructureOfType([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER, STRUCTURE_WALL, STRUCTURE_RAMPART]);
        if (structure) {
          tower.repair(structure);
          return OK;
        }
    }
  }
};

module.exports = tower;

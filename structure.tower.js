var tower = {
  run: function(tower) {
    creep = tower.findClosestInjuredCreep();
    if(creep) {
        tower.heal(creep);
        return OK;
    }

    var creep = tower.findClosestHostileCreep();
    if (creep) {
      tower.attack(creep);
      return OK;
    };

    //if(tower.energy > 500) {
        var structure = tower.findWeakestStructureOfType([STRUCTURE_CONTAINER, STRUCTURE_ROAD, STRUCTURE_TOWER, STRUCTURE_WALL, STRUCTURE_RAMPART]);
        if (structure && structure.hits <= 1000) {
          tower.repair(structure);
          return OK;
        }
    //}
  }
};

module.exports = tower;

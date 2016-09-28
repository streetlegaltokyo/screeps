var towerExtensions = {
  register: function () {
    StructureTower.prototype.findClosestHostileCreep = function() {
      return this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    };
    
    StructureTower.prototype.findClosestStructureNeedingRepair = function() {
			var reallyWeak = this.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: function(s) {
					switch (s.structureType) {
						case STRUCTURE_WALL:
							return s.hits < 100;
						default:
							return s.hits < (s.hitsMax*.05);
					}
				}
			});

			if (!!reallyWeak) return reallyWeak;

			return this.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: function(s) {
					switch (s.structureType) {
						case STRUCTURE_WALL:
							return 0; // Don't upgrade the walls too much... This needs some adjustments later.
						default:
							return s.hits < (s.hitsMax*.7);
					}
				}
			});
		};
  }
};

module.exports = towerExtensions;

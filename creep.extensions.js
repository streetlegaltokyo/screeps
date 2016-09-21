var creepExtensions = {
	run: function(creep)
	{
        //Spawn
        Creep.prototype.findClosestSpawn = function() {
            return this.pos.findClosestByPath(FIND_MY_SPAWNS);
        };

        //Container
        Creep.prototype.findClosestContainer = function() {
            return this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(c) {
                    return c.structureType == STRUCTURE_CONTAINER && c.store.energy < c.storeCapacity;
                }
            });
        };

        Creep.prototype.findClosestContainerWithEnergy = function() {
            return this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(c) {
                    return c.structureType == STRUCTURE_CONTAINER && c.store.energy < c.storeCapacity && c.store.energy > 0;
                }
            });
        };

        Creep.prototype.findClosestSource = function() {
            return this.pos.findClosestByPath(FIND_SOURCES);
        };

        Creep.prototype.findClosestStructureNeedingRepair = function() {
            return this.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(s) {return s.hits < (s.hitsMax*.7)}});
        };

        Creep.prototype.findClosestConstructionSite = function() {
            return this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        };
	}
};

module.exports = creepExtensions;

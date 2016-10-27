var link = {
  run: function(link) {
    var otherLinks = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_LINK && s.id != link.id);
    //console.log(JSON.stringify(otherLinks.length));
        if(link.energy == link.energyCapacity) {
            var min = _.min(otherLinks, function(l) {
                  return l.energy;
                });
            link.transferEnergy(min, min.energyCapacity - min.energy);
        }
  }
};

module.exports = link;

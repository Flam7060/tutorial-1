var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER &&
                           structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (containers.length > 0) {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                // var sources = creep.room.find(FIND_SOURCES);
                // if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                // }
                // мешает фармить другим крипам 
                creep.moveTo(10,40)
            }
        }
    }
};

module.exports = roleUpgrader;

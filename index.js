'use strict';

class fov {

	constructor(mod) {
		this.mod = mod;
		this.command = mod.command;
		this.hook = null;
		
		mod.command.add('fov', (args) => {
			mod.send('S_STEER_DEBUG_COMMAND', 1, { command: `fov 100` });
		});
		
		// set our proper fov on spawn-in
		this.hook = mod.hook('S_SPAWN_ME', "event", () => {
			mod.send('S_STEER_DEBUG_COMMAND', 1, { command: `fov 100` });
		});
		
		// prevent game from reverting
		this.hook = mod.hook('S_STEER_DEBUG_COMMAND', 1, {filter: {"fake": false, "modified": false}}, () => {
			return false;
		});
	};
	
	send(message) {
		this.command.message(': ' + message);
	};
	
	destructor() {
		this.command.remove('fov');
		this.mod.unhook(this.hook);
		this.hook = null;
	};
};

module.exports = { NetworkMod: fov };

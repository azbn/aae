'use strict';

var path = require('path')
	, fs = require('fs')
	, child_process = require('child_process')
	, fork = child_process.fork
	, spawn = child_process.spawn
;

module.exports = function(loading_app){
	
	//console.log(loading_app);
	
	var azbn = this;
	
	loading_app.azbn = azbn;
	
	var loading_app_path = path.dirname(loading_app.filename);
	
	var ctrl = {};
	
	ctrl = {
		azbn : azbn,
		__mdls : {
			
		},
		path : {
			
			app : loading_app_path,
			mdls : path.join(loading_app_path, 'mdls'),
			fork : path.join(loading_app_path, 'fork'),
			data : path.join(loading_app_path, 'data'),
			config : path.join(loading_app_path, 'config'),
			
		},
		mdl : function(uid, p) {
			
			var _mdl = uid.split(':');
			if(ctrl.__mdls[uid]) {
				
			} else {
				ctrl.__mdls[uid] = new require(path.join(ctrl.path.mdls, _mdl[0]))(ctrl, p || {});
			}
			return ctrl.__mdls[uid];
			
		},
		fork : function(command, data, cb) {
			
			if(command && command != '') {
				
				data = data || {};
				
				var _process = fork(ctrl.path.fork + '/' + command, [
					azbn.mdl('process/child').getCliData(data)
				], {
					cwd : ctrl.path.app,
				});
				
				_process.on('message', function(_msg){
					
					cb(_process, _msg);
					
				});
				
			} else {
				
				cb({});
				
			}
			
		},
		loadJSON : function(uid) {
			var path = ctrl.path.data + '/' + uid + '.json';
			if (fs.existsSync(path)) {
				return require(path);
			} else {
				return {};
			}
		},
		saveJSON : function(uid, o) {
			fs.writeFileSync(ctrl.path.data + '/' + (uid || 'default') + '.json', JSON.stringify(o || {}));
		},
		saveFile : function(uid, str) {
			fs.writeFileSync(ctrl.path.data + '/' + (uid || 'default.txt'), str || '');
		},
		
	};
	
	return ctrl;
	
};

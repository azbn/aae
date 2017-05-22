'use strict';

var path = require('path')
	, fs = require('fs')
	, child_process = require('child_process')
	, fork = child_process.fork
	, spawn = child_process.spawn
	, winston = require('winston')
;

module.exports = function(loading_app, workdirectory){
	
	//console.log(loading_app);
	
	var azbn = this;
	
	loading_app.azbn = azbn;
	
	workdirectory = workdirectory || '';
	
	var loading_app_path = path.dirname(loading_app.filename) + workdirectory;
	
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
			var _path = ctrl.path.data + '/' + uid + '.json';
			if (fs.existsSync(_path)) {
				return require(_path);
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
		
		mkDataDir : function(uid) {
			if(typeof uid != 'string') {
				uid = uid.join('/');
			}
			var _path2create = ctrl.path.data + '/' + uid;
			if(!fs.existsSync(_path2create)){
				var _uid_arr = uid.split('/');
				var _uid_substr = '';
				for(var _j in _uid_arr) {
					var _d = _uid_arr[_j];
					_uid_substr = _uid_substr + '/' + _d;
					try {
						var _full_path = ctrl.path.data + _uid_substr;
						if(!fs.existsSync(_full_path)){
							fs.mkdirSync(_full_path);
						}
					} catch (err) {
						azbn.echo_dev('Error on create directory ' + err);
					}
				}
			}
		},
		
		log : new winston.Logger({
			transports : [
				new winston.transports.Console({
					colorize	:	true,
					level		:	'debug',
					label		:	loading_app_path.split('/').slice(-2).join('/'),
				}),
			]
		}),
		
	};
	
	return ctrl;
	
};

'use strict';

var child_process = require('child_process');

var fork = child_process.fork;
var spawn = child_process.spawn;

var _ = function(azbn, p) {
	
	var ctrl = {
		
		fork : function(command, data, cb) {
			
			if(command && command != '') {
				
				data = data || {};
				
				var _process = fork(__dirname + '/../../../../common/fork/' + command, [ //__dirname + '/../' + azbn.mdl('cfg').path.fork + '/' + command
					ctrl.getCliData(data)
				], {
					cwd : __dirname + '/../../../../',
				});
				
				_process.on('message', function(_msg){
					
					/*
					if(msg.status == 0) {
						msg.timing = timing.end();
					}
					*/
					
					cb(_process, _msg);
					
				});
				
			} else {
				
				cb({});
				
			}
			
		},
		
		cli : function(command, data, cb) {
			
			if(command && command != '') {
				
				var command_arr = command.split(' ');
				var command_root = command_arr.shift();
				
				for(var i in data) {
					command_arr[i] = data[i];
				}
				
				var _process_resp = {
					stdout : [],
					stderr : [],
					code : null,
					//timing : 0,
				};
				
				//var timing = new (azbn.mdl('timing')).createTiming(command);
				
				var _process = spawn(command_root, command_arr);
				
				_process.on('error', function(err){
					//throw err;
					cb(err);
				});
				
				_process.stdout.on('data', function(data){
					_process_resp.stdout.push(data.toString('utf8'));
				});
				
				_process.stderr.on('data', function(data){
					_process_resp.stderr.push(data.toString('utf8'));
				});
				
				_process.on('close', function(code){
					//_process_resp.timing = timing.end();
					_process_resp.code = code;
					cb(_process_resp);
				});
				
				
			} else {
				
				cb({});
				
			}
			
		},
		
		kill : function(p, status, o) {
			
			o = o || {};
			o.status = status || 0;
			p.send(o);
			
		},
		
		getCliData : function(o) {
			var _o = null;
			if(o) {
				_o = JSON.stringify(o);
			} else {
				_o = JSON.stringify({});
			}
			return new Buffer(_o).toString('base64');
		},
		
		parseCliData : function(a) {
			if(a && a[2]) {
				return JSON.parse(new Buffer(a[2], 'base64').toString('utf8'));
			} else {
				return {};
			}
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
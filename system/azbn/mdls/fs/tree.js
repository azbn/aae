'use strict';

var fs = require('fs');
var path = require('path');

var _ = function(azbn, p) {
	
	var ctrl = {
		
		walk : function(dir, file_cb, done) {
			
			var results = [];
			
			fs.readdir(dir, function(err, list) {
				
				if (err) return done(err);
				
				var pending = list.length;
				
				if (!pending) return done(null, results);
				
				list.forEach(function(file) {
					
					/*
					var in_masked = 0;
					
					if(fmask != false) {
						in_masked = file.search(fmask);//fmask.test(file);
					}
					*/
					
					var _file = path.normalize(path.resolve(dir, file));
					
					fs.stat(_file, function(_err, stat) {
						
						if(_err) {
							
						} else {
							
							file_cb(_file, stat);
							
							if (stat && stat.isDirectory()) {
								
								ctrl.walk(_file, file_cb, function(err, res) {
									
									results = results.concat(res);
									if (!--pending) done(null, results);
									
								});
								
							} else if(stat && stat.isFile()) {
								
								if (!--pending) done(null, results);
								
							}
							
						}
						
					});
					
				});
				
			});
			
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
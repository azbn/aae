'use strict';

var path = require('path');

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
			data : path.join(loading_app_path, 'data'),
			config : path.join(loading_app_path, 'config'),
			
		},
		mdl : function(uid, p) {
			
			if(ctrl.__mdls[uid]) {
				
			} else {
				ctrl.__mdls[uid] = new require(path.join(ctrl.path.mdls, uid))(ctrl, p || {});
			}
			
			return ctrl.__mdls[uid];
			
		},
	};
	
	return ctrl;
	
};
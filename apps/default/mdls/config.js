'use strict';

module.exports = function(app, p){
	
	var ctrl = require(app.path.config + '/main.json');
	
	return ctrl;
	
}
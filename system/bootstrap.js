'use strict';

var _ = function(p) {
	
	var azbn = new require(__dirname + '/azbn/azbn')(p);
	
	azbn.loadApp = require(__dirname + '/azbn/loadApp');
	
	azbn.uuid = require(__dirname + '/azbn/uuid');
	
	return azbn;
	
}

module.exports = _;
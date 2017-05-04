'use strict';

var mysql = require('mysql');

var _ = function(azbn, p) {
	
	var _p = p || {
		host : 'localhost',
		user : '',
		password : '',
		database : '',
	};
	
	var ctrl = mysql.createConnection({
		host		: _p.host,
		user		: _p.user,
		password	: _p.password,
		database	: _p.database,
	});
	
	return ctrl;
	
};

module.exports = _;
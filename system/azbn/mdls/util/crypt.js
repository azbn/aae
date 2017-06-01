'use strict';

var crypto = require('crypto')
;

var _ = function(azbn, p) {
	
	var ctrl = {
		
		hash : function(str, h) {
			
			h = h || 'md5';
			
			return crypto.createHash(h).update(str).digest('hex');
			
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
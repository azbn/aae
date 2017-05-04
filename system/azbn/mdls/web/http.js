'use strict';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var _request = require('request')
	, cheerio = require('cheerio')
;

var _ = function(azbn, p) {
	
	var request = _request.defaults(p || {
		headers: {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36 aaeEdition',
			//'encoding' : 'utf8',
			//'proxy' : 'http://localproxy.com',
			//'rejectUnauthorized' : false,
		},
	});
	
	var ctrl = {
		
		r : function(method, url, data, cb) {
			request({
				method : method,
				url : url,
				formData : data,
			}, cb);
		},
		
		parse : function(html) {
			return cheerio.load(html, {
				normalizeWhitespace : true,
				decodeEntities : false,
				//xmlMode : true,
			});
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;
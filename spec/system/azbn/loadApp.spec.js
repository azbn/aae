'use strict';

describe('system/azbn/loadApp', function(){
	
	var _
		, azbn
		, path = require('path')
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../../system/bootstrap')({
			
		});
		
	});
	
	it('Создание объекта приложения', function(done) {
		
		var app = azbn.loadApp(module);
		
		expect(path.dirname(module.filename) == app.path.app).toBe(true);
		expect(path.dirname(module.filename) === app.path.app).toBe(true);
		done();
		
	});
	
});
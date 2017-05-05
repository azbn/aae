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
		
		var json_object = app.loadJSON(azbn.randstr());
		
		expect(path.dirname(module.filename) == app.path.app).toBe(true);
		expect(path.dirname(module.filename) === app.path.app).toBe(true);
		
		expect(azbn.is_def(json_object) && typeof json_object == 'object').toBe(true);
		
		done();
		
	});
	
});
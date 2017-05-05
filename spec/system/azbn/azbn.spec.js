'use strict';

describe('system/azbn/azbn', function(){
	
	var _
		, azbn
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../../system/bootstrap')({
			
		});
		
	});
	
	it('Существование объекта azbn', function(done) {
		
		expect(typeof azbn == 'object').toBe(true);
		done();
		
	});
	
	it('Проверка функций', function(done) {
		
		var _now = azbn.now();
		var _randstr = azbn.randstr();
		
		var random_parameter_number = 234;
		var random_parameter_string = '' + 234;
		
		azbn.set('random_parameter_number', random_parameter_number);
		azbn.set('random_parameter_string', random_parameter_string);
		
		var json_object = azbn.loadJSON(azbn.randstr());
		
		expect(typeof _now == 'number').toBe(true);
		expect(parseInt(_now) == _now).toBe(true);
		expect(parseFloat(_now) == _now).toBe(true);
		
		expect(typeof _randstr == 'string').toBe(true);
		expect('' + _randstr == _randstr).toBe(true);
		
		expect(azbn.is_null(null)).toBe(true);
		expect(azbn.is_null(_now)).toBe(false);
		expect(azbn.is_null(_randstr)).toBe(false);
		
		expect(azbn.get('random_parameter_number') == azbn.get('random_parameter_string')).toBe(true);
		expect(azbn.get('random_parameter_number') === azbn.get('random_parameter_string')).toBe(false);
		
		expect(azbn.inArray(azbn.randitem(_randstr), _randstr)).toBe(true);
		
		expect(azbn.isDev()).toBe(true);
		expect(azbn.isDev(true)).toBe(true);
		expect(azbn.isDev(false)).toBe(false);
		
		expect(azbn.is_def(json_object) && typeof json_object == 'object').toBe(true);
		
		done();
		
	});
	
});
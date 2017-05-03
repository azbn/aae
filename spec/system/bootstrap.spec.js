'use strict';

describe('system/bootstrap', function(){
	
	var _
		, azbn
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../system/bootstrap')({
			
		});
		
	});
	
	it('Создание объекта azbn', function(done) {
		
		expect(typeof azbn == 'object').toBe(true);
		expect(typeof azbn.version == 'float').toBe(true);
		expect(typeof azbn.loadApp == 'function').toBe(true);
		done();
		
	});
	
});
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
	
});
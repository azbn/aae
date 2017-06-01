'use strict';

describe('system/azbn/mdls/util/crypt', function(){
	
	var _
		, azbn
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../../../../system/bootstrap')({
			
		});
		
	});
	
	it('Подключение util/crypt-модуля', function(done) {
		
		expect(typeof azbn.mdl('util/crypt') == 'object').toBe(true);
		done();
		
	});
	
	it('Получение данных от yandex.ru', function(done) {
		
		expect(typeof azbn.mdl('util/crypt').hash('123') == 'string').toBe(true);
		done();
		
	});
	
});
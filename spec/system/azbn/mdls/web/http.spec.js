'use strict';

describe('system/azbn/mdls/web/http', function(){
	
	var _
		, azbn
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../../../../system/bootstrap')({
			
		});
		
	});
	
	it('Подключение web/http-модуля', function(done) {
		
		expect(typeof azbn.mdl('web/http') == 'object').toBe(true);
		done();
		
	});
	
	it('Получение данных от yandex.ru', function(done) {
		
		azbn.mdl('web/http').r('GET', 'https://yandex.ru/', {}, function(error, response, body){
			//console.log(azbn.len(error));
			//console.log((response));
			//console.log(azbn.len(body));
			//console.log($('title').eq(0).html());
			
			var $ = azbn.mdl('web/http').parse(body);
			
			expect($('title').length > 0).toBe(true);
			expect((new RegExp('яндекс', 'ig')).test($('title').eq(0).html())).toBe(true);
			done();
			
		});
		
	});
	
});
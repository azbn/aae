'use strict';

describe('system/azbn/mdls/db/mysql', function(){
	
	var _
		, azbn
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../../../../system/bootstrap')({
			
		});
		
	});
	
	it('Подключение db/mysql-модуля', function(done) {
		
		expect(typeof azbn.mdl('db/mysql') == 'object').toBe(true);
		done();
		
	});
	
	it('Подключение к mysql. Удачное подключение', function(done) {
		
		azbn.mdl('db/mysql', azbn.loadJSON('config/db/mysql')).connect(function(err){
			
			if(err) {
				
				expect(false).toBe(true);
				
			} else {
				
				expect(err).toBe(null);
				expect(typeof azbn.mdl('db/mysql').end == 'function').toBe(true);
				azbn.mdl('db/mysql').end();
				
			}
			
			done();
			
		});
		
	});
	
	it('Подключение к mysql. Ошибка при подключении', function(done) {
		
		azbn.mdl('db/mysql').connect(function(err){
			
			if(err) {
				
				//console.log(err);
				
				expect(typeof err == 'object').toBe(true);
				expect(err.fatal).toBe(true);
				//expect(err.syscall).toBe('connect');
				expect(err.errno == 1045 || err.errno == 'ECONNREFUSED').toBe(true);
				
			} else {
				
				expect(false).toBe(true);
				
			}
			
			done();
			
		});
		
	});
	
});
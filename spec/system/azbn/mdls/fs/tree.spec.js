'use strict';

describe('system/azbn/mdls/fs/tree', function(){
	
	var _
		, azbn
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../../../../system/bootstrap')({
			
		});
		
	});
	
	it('Подключение fs/tree-модуля', function(done) {
		
		expect(typeof azbn.mdl('fs/tree') == 'object').toBe(true);
		done();
		
	});
	
	it('Обход папки модуля', function(done) {
		
		azbn.mdl('fs/tree').walk(__dirname + '/../../../../../', function(file, stat){
			
			if (stat && stat.isDirectory()) {
				
			} else if(stat) {
				
				//console.log(file);
				expect(typeof file == 'string').toBe(true);
				
			}
			
		}, function(err, results){
			
			//azbn.echo(results);
			
			expect(typeof results == 'object').toBe(true);
			//expect(results.length > 0).toBe(true);
			done();
			
		});
		
	});
	
	
	
});
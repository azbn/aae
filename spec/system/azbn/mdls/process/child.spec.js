'use strict';

describe('system/azbn/mdls/process/child', function(){
	
	var _
		, azbn
	;
	
	beforeEach(function(){
		
		azbn = new require(__dirname + '/../../../../../system/bootstrap')({
			
		});
		
	});
	
	it('Подключение process/child-модуля', function(done) {
		
		expect(typeof azbn.mdl('process/child') == 'object').toBe(true);
		done();
		
	});
	
	it('Выполнение команды (функция cli)', function(done) {
		
		var cmd = 'ls -la';
		
		if(process.platform == 'win32') {
			cmd = 'chcp 65001 | dir';
		}
		
		azbn.mdl('process/child').cli(cmd, {}, function(resp){
			
			expect(typeof resp == 'object').toBe(true);
			expect(typeof resp.code == 'number').toBe(true);
			expect(resp.stdout.length > 0 || resp.stderr.length > 0).toBe(true);
			done();
			
		});
		
	});
	
	it('Создание подпроцесса node.js (функция fork)', function(done) {
		
		var cmd = 'default';
		
		var _t = azbn.now();
		
		azbn.mdl('process/child').fork(cmd, {test : _t,}, function(_process, _msg){
			
			if(_msg.kill_child == 0) {
				_process.kill();
			}
			
			expect(typeof _msg == 'object').toBe(true);
			expect(typeof _msg.data == 'object').toBe(true);
			expect(_msg.data.test == _t).toBe(true);
			done();
			
		});
		
	});
	
});
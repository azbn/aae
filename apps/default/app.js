'use strict';

var azbn = new require(__dirname + '/../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

//console.log(app.mdl('config'));

//azbn.echo('Start app ' + module.filename);

//azbn.echo(azbn.processInfo());

/*
azbn.mdl('process/child').cli('chcp 65001 | dir', {}, function(resp){
	console.log(resp);
});
*/

azbn.mdl('process/child').fork('default', {test : '123', text : 'привет!'}, function(_process, _msg){
	
	console.log(_msg);
	
	if(_msg.kill_child == 0) {
		_process.kill();
	}
	
});

app.fork('default', {test : '234', text : 'hello!'}, function(_process, _msg){
	
	console.log(_msg);
	
	if(_msg.kill_child == 0) {
		_process.kill();
	}
	
});

azbn.mdl('process/child').cli('chcp 65001 | dir', {test : '123', text : 'привет!'}, function(_resp){
	
	console.log(_resp);
	
});
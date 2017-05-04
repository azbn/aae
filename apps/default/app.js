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


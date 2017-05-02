'use strict';

var azbn = new require(__dirname + '/../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

//console.log(app.mdl('config'));

azbn.echo('Start app ' + module.filename);
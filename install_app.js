'use strict';

var azbn = new require(__dirname + '/system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist').argv;
//var spawn = require('child_process').spawn;

if(argv.who && argv.repo && argv.who != '' && argv.repo != '') {
	
	if(argv.repo.match(/^(aae.app.)/)) {
		
		azbn.echo('Ok, it is right uid: ' + argv.repo);
		
		var app_uid = argv.repo.replace('aae.app.', '');
		var app_path = app_uid.split('.').join('/');
		
		azbn.mdl('process/child').cli('git clone https://github.com/' + argv.who + '/' + argv.repo + ' apps/' + app_path, {}, function(data){
			
			//_data = JSON.parse(data);
			
			if(data.code == 0) {
				
				azbn.echo('Installed');
				
			} else {
				
				azbn.echo(data);
				
			}
			
		});
		
	}
	
}
'use strict';

var azbn = new require(__dirname + '/system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist').argv;
//var spawn = require('child_process').spawn;

var app_reg = azbn.loadJSON('apps');

if(argv.who && argv.repo && argv.who != '' && argv.repo != '') {
	
	if(argv.repo.match(/^(aae.app.)/)) {
		
		var local_app_uid = [argv.who, argv.repo].join('/');
		
		azbn.echo('Ok, it is right uid: ' + argv.repo);
		
		if(app_reg.items[local_app_uid]) {
			
			azbn.echo('Ooops! App ' + local_app_uid + ' was installed');
			
		} else {
			
			var app_uid = argv.repo.replace('aae.app.', '');
			var app_path = app_uid.split('.').join('/');
			
			azbn.mdl('process/child').cli('git clone https://github.com/' + argv.who + '/' + argv.repo + ' apps/' + argv.who + '/' + app_path, {}, function(data){
				
				//_data = JSON.parse(data);
				
				if(data.code == 0) {
					
					app_reg.items[local_app_uid] = {
						created_at : azbn.now(),
						who : argv.who,
						repo : argv.repo,
						path : 'apps/' + app_path,
					};
					
					azbn.saveJSON('apps', app_reg);
					
					azbn.echo('Installed');
					
				} else {
					
					azbn.echo(data);
					
				}
				
			});
			
		}
		
	}
	
}
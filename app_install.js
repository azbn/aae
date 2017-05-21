'use strict';

var azbn = new require(__dirname + '/system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist').argv;
//var spawn = require('child_process').spawn;

var app_reg = azbn.loadJSON('apps');


var parseLink = function(link) {
	var arr = link.split('/');
	return {
		link : link,
		developer : arr[3],
		repo : arr[4],
		app : {
			uid : arr[4].replace('aae.app.', ''),
		},
	};
}

var repo_url = argv.repo || '';

if(argv.repo != '' && argv.repo.match(/^(http)/ig)) {
	
	var repo = parseLink(argv.repo);
	
	//if(argv.repo.match(/^(aae.app.)/)) {
		
		var local_app_uid = [repo.developer, repo.app.uid].join('/');
		
		if(app_reg.items[local_app_uid]) {
			
			azbn.echo('Ooops! App ' + local_app_uid + ' was installed');
			
		} else {
			
			var app_path = repo.app.uid.split('.').join('/');
			var _app_path = 'apps/' + repo.developer + '/' + app_path;
			
			azbn.mdl('process/child').cli('git clone ' + repo.link + ' ' + _app_path, {}, function(data){
				
				//_data = JSON.parse(data);
				
				if(data.code == 0) {
					
					app_reg.items[local_app_uid] = {
						installed : {
							at : azbn.now(),
							from : repo.link,
						},
						developer : repo.developer,
						repo : repo.repo,
						uid : local_app_uid,
						path : _app_path,
					};
					
					azbn.saveJSON('apps', app_reg);
					
					azbn.echo('App ' + local_app_uid + ' was installed');
					
				} else {
					
					azbn.echo(data);
					
				}
				
			});
			
		}
		
	//}
	
}
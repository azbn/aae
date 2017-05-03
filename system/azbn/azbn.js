'use strict';

var Azbn = function(p){
	
	var ctrl = {
		__param : p || {},
		__mdls : {},
		__is_dev : true,
	};
	
	ctrl.azbn = ctrl;
	
	ctrl.version = 0.1;
	
	ctrl.isDev = function(){
		return ctrl.__is_dev;
	};
	
	ctrl.echo = function(text) {
		console.log(this.formattime(), ': ', text);
	};
	
	ctrl.echo_dev = function(text) {
		if(ctrl.isDev) {
			console.log(this.formattime(), ': ', text);
		}
	};
	
	ctrl.set = function(name, value) {
		ctrl.__param[name] = value;
		return ctrl;
	};
	
	ctrl.get = function(name) {
		return ctrl.__param[name];
	};
	
	ctrl.len = function(arr) {
		if(ctrl.is_def(arr) && !ctrl.is_null(arr)) {
			return arr.length;
		} else {
			return 0;
		}
	},
	
	ctrl.randstr = function(l) {
		return (Math.random().toString(l || 36).split('.'))[1];
	};
	
	ctrl.is_def = function(v) {
		if(v == undefined || typeof v == 'undefined') {
			return false;
		} else {
			return true;
		}
	};
	
	ctrl.is_null = function(v) {
		if(v == null) {
			return true;
		} else {
			return false;
		}
	};
	
	ctrl.is_func = function(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};
	
	ctrl.inArray = function(needle, haystack) {
		for(var i = 0; i < haystack.length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	};
	
	ctrl.now = function() {
		return new Date().getTime();
	};
	
	ctrl.now_sec = function() {
		return Math.floor(ctrl.now() / 1000);
	};
	
	ctrl.sleep = function(milliSeconds) {
		var startTime = ctrl.now();
		while (ctrl.now() < startTime + milliSeconds);
	};
	
	ctrl.formattime = function(m) {
		m = m || ctrl.now();
		var x = new Date(m);
		var d = {
			Y	: x.getFullYear(),
			m	: (x.getMonth() + 1),
			d	: x.getDate(),
			H	: x.getHours(),
			i	: x.getMinutes(),
			s	: x.getSeconds(),
			ms	: x.getMilliseconds(),
		};
		var D = {};
		for(var n in d) {
			D[n] = (parseInt(d[n], 10) < 10 ) ? ('0' + d[n]) : (d[n]);
		}
		D.ms = (parseInt(D.ms, 10) < 100 ) ? ('0' + D.ms) : (D.ms);
		var z = '' + D.Y + D.m + D.d + '.' + D.H + D.i + D.s + '.' + D.ms;
		return z;
	};
	
	ctrl.mdl = function(uid, p) {
		if(ctrl.__mdls[uid]) {
			
		} else {
			ctrl.__mdls[uid] = new require(path.join(__dirname, 'mdls', uid))(ctrl, p || {});
		}
		return ctrl.__mdls[uid];
	};
	
	ctrl.setMdl = function(uid, mdl) {
		ctrl.__mdls[uid] = mdl;
		return ctrl.__mdls[uid];
	};
	
	return ctrl;
	
};

module.exports = Azbn;
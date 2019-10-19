/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class Logger {
		
		constructor(obj) {
			let self = this;
			
			self.obj = obj;
		}
		
		perfix() {
			let per = '[]';
		
		//return (async function(){})();
	}

	debug (arg0, arg1) {
		let self = this;
		
		//console.log(typeof self.obj);
		//console.log('self.obj:', self.obj);
		//console.log('self.obj.constructor:', self.obj.constructor);
		
		let err = new Error();
		//console.log(err);
		//console.log(err.stack.split('\\r'));

		let msg = '['+self.obj.constructor.packageName+'.' + self.obj.constructor.name+'] ' + arg0;

		if (arg1) {
			console.log(msg, arg1);
		}else{
			console.log(msg);
		}
		
		//return (async function(){})();
	}
}
/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class Log {

	constructor(clazz) {
		clazz = clazz ? clazz:class Main {};
		this.clazz = clazz;
		this.loggerNode = document.getElementById('logger');
	}
	
	getPrefix(args) {
		let prefix = '';
		
		prefix = this.clazz.prototype.constructor.name + '';
		
		prefix = 'Logger - [' + prefix + ']';
		return prefix;
	}
	
	appendLoggerNode(argus) {
		if(this.loggerNode) {
			for (var i = 0; i < argus.length; i++) {
				try{
					if ('object' === typeof argus[i]) {
						// error: cyclic object value
						this.loggerNode.innerHTML += (JSON && JSON.stringify ? JSON.stringify(argus[i], undefined, 2) : argus[i]) + '<br />';
					} else {
						this.loggerNode.innerHTML += argus[i] + '<br />';
					}
				}catch(exception) {
					console.error('[cowidget.common.Log] exception: ', exception);
				}
			}
		}
	}
	
	log() {
		console.log.apply(console, arguments);
	}
	
	log() {		
		arguments[0] = this.getPrefix(arguments) + ' [INFO] ' + arguments[0];
		console.log.apply(console, arguments);
		
		this.appendLoggerNode(arguments);
	}
	
	debug() {		
		arguments[0] = this.getPrefix(arguments) + ' [DEBUG] ' + arguments[0];
		console.debug.apply(console, arguments);
		
		this.appendLoggerNode(arguments);
	}
	
	error() {		
		arguments[0] = this.getPrefix(arguments) + ' [ERROR] ' + arguments[0];
		console.error.apply(console, arguments);
		
		this.appendLoggerNode(arguments);
	}
}
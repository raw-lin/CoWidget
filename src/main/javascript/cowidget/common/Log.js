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
	
	getPrefix(args, logTag) {
		let prefix = '';
		let emptyString = '';
		
		if(this.clazz.packageName) {
			prefix = prefix + this.clazz.packageName + '.';
		}
		prefix = prefix + this.clazz.prototype.constructor.name + '';
		
		prefix = 'CoWLogger - ' + (logTag ? logTag.padEnd(5, ' '):emptyString.padEnd(5, ' ')) + ' [' + prefix + ']';
		return prefix;
	}
	
	appendLoggerNode(args, logTag) {
		let txt = '';
		if(this.loggerNode) {
			for (var i = 0; i < args.length; i++) {
				try{
					if ('object' === typeof args[i]) {
						// error: cyclic object value
						txt = txt + (i+'a. ') +  (JSON && JSON.stringify ? JSON.stringify(args[i], undefined, 2) : args[i]);
					}else if ('string' === typeof args[i]) {
						txt = txt + (i+'b. ') + args[i];
					} else {
						txt = txt + (i+'c. ') + args[i];
					}
				}catch(exception) {
					console.error('[cowidget.common.Log] args[i]: ' + i + ': ', args[i]);
					console.error('[cowidget.common.Log] exception: ', exception);
				}
			}
			
			this.loggerNode.innerHTML = this.loggerNode.innerHTML + '<br />' + txt ;
		}
	}
	
	log() {
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'INFO') + ' ' + args[0];
		console.log.apply(console, args);
		
		this.appendLoggerNode(args, 'INFO');
	}
	
	info() {
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'INFO') + ' ' + args[0];
		console.log.apply(console, args);
		
		this.appendLoggerNode(args, 'INFO');
	}
	
	debug() {	
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'DEBUG') + ' ' + args[0];
		console.debug.apply(console, args);
		
		this.appendLoggerNode(args, 'INFO');
	}
	
	warn() {
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'WARN') + ' ' + args[0];
		console.warn.apply(console, args);
		
		this.appendLoggerNode(args, 'INFO');
	}
	
	error() {
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'ERROR') + ' ' + args[0];
		console.error.apply(console, args);
		
		this.appendLoggerNode(args, 'INFO');
	}
}
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
		
		if(this.clazz.packageName) {
			prefix = prefix + this.clazz.packageName + '.';
		}
		prefix = prefix + this.clazz.prototype.constructor.name + '';
		
		prefix = 'CoWLogger - ' + logTag.padEnd(5, ' ') + ' [' + prefix + ']';
		return prefix;
	}
	
	appendLoggerNode(argus) {
		let txt = '';
		if(this.loggerNode) {
			for (var i = 0; i < argus.length; i++) {
				try{
					if ('object' === typeof argus[i]) {
						// error: cyclic object value
						txt = txt + (i+'a. ') +  (JSON && JSON.stringify ? JSON.stringify(argus[i], undefined, 2) : argus[i]);
					}else if ('string' === typeof argus[i]) {
						txt = txt + (i+'b. ') + argus[i];
					} else {
						txt = txt + (i+'c. ') + argus[i];
					}
				}catch(exception) {
					console.error('[cowidget.common.Log] argus[i]: ' + i + ': ', argus[i]);
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
		
		this.appendLoggerNode(args);
	}
	
	info() {
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'INFO') + ' ' + args[0];
		console.log.apply(console, args);
		
		this.appendLoggerNode(args);
	}
	
	debug() {	
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'DEBUG') + ' ' + args[0];
		console.debug.apply(console, args);
		
		this.appendLoggerNode(args);
	}
	
	warn() {
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'WARN') + ' ' + args[0];
		console.warn.apply(console, args);
		
		this.appendLoggerNode(args);
	}
	
	error() {
		let args = Object.create(arguments);
		
		args[0] = this.getPrefix(args, 'ERROR') + ' ' + args[0];
		console.error.apply(console, args);
		
		this.appendLoggerNode(args);
	}
}
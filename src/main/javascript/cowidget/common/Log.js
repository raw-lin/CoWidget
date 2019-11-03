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
		this.prefixed = '';
		
		//console.debug('typeof clazz: ' + typeof clazz);
		if('string' === typeof clazz) {
			this.prefixed = clazz;
		}else {
			if(this.clazz.packageName) {
				this.prefixed = this.clazz.packageName + '.';
			}
			
			if(this.clazz.prototype.constructor.name) {
				this.prefixed = this.prefixed + this.clazz.prototype.constructor.name + '';
			}
		}
		
		this.loggerNode = document.getElementById('logger');
	}
	
	getPrefixed(args, logTag) {
		let prefixed = '';		
		prefixed = 'CoWLogger - ' + (logTag ? logTag.padEnd(5, ' '):emptyString.padEnd(5, ' ')) + ' [' + this.prefixed + ']';
		return prefixed;
	}
	
	appendLoggerNode(args, logTag) {
		let txt = '';
		if(this.loggerNode) {

			args.forEach((currentValue, index, array) => {
				try{
					if ('object' === typeof currentValue) {
						// error: cyclic object value
						txt = txt + (index+'o. ') +  (JSON && JSON.stringify ? JSON.stringify(currentValue, undefined, 2) : currentValue);
					}else if ('string' === typeof currentValue) {
						txt = txt + (index+'s. ') + currentValue;
					} else {
						txt = txt + (index+'x. ') + currentValue;
					}
				}catch(exception) {
					console.error('[cowidget.common.Log] currentValue: ' + index + ': ', currentValue);
					console.error('[cowidget.common.Log] exception: ', exception);
				}
			});
			
			this.loggerNode.innerHTML = this.loggerNode.innerHTML + '<br />' + txt ;
		}
	}
	
	log(logTag, args) {
		logTag = logTag ? logTag:'INFO';
		
		args = args ? args:Object.create(arguments);
		
		args[0] = this.getPrefixed(args, logTag) + ' ' + args[0];
		
		if('INFO' === logTag) {
			console.log.apply(console, args);
		}else if('DEBUG' === logTag) {
			console.debug.apply(console, args);
		}else if('WARN' === logTag) {
			console.warn.apply(console, args);
		}else if('ERROR' === logTag) {
			console.error.apply(console, args);
		}else {
			console.log.apply(console, args);
		}
		
		this.appendLoggerNode(args, logTag);
	}
	
	info() {
		let args = Object.create(arguments);
		this.log('INFO', args);
		
//		args[0] = this.getPrefixed(args, 'INFO') + ' ' + args[0];
//		console.log.apply(console, args);
//		
//		this.appendLoggerNode(args, 'INFO');
	}
	
	debug() {
		let args = Object.create(arguments);
		this.log('DEBUG', args);
		
		//args[0] = this.getPrefixed(args, 'DEBUG') + ' ' + args[0];
		//console.debug.apply(console, args);
		
		//this.appendLoggerNode(args, 'DEBUG');
	}
	
	warn() {
		let args = Object.create(arguments);
		this.log('WARN', args);
		
//		args[0] = this.getPrefixed(args, 'WARN') + ' ' + args[0];
//		console.warn.apply(console, args);
//		
//		this.appendLoggerNode(args, 'WARN');
	}
	
	error() {
		let args = Object.create(arguments);
		this.log('ERROR', args);
		
//		args[0] = this.getPrefixed(args, 'ERROR') + ' ' + args[0];
//		console.error.apply(console, args);
//		
//		this.appendLoggerNode(args, 'ERROR');
	}
}
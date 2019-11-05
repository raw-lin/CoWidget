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
		
		this.withDebug = false;
	}
	
	
	getPrefixed(args, logTag) {
		let prefixed = '';		
		prefixed = 'CoWLogger - ' + (logTag ? logTag.padEnd(5, ' '):emptyString.padEnd(5, ' ')) + ' [' + this.prefixed + ']';
		
		return prefixed;
	}
	
	appendLoggerNode(args, logTag) {
		let txt = '';
		if(this.loggerNode) {
			//console.debug('[appendLoggerNode] args: ', args);
			if(false && Array.isArray(args)) {
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
						console.error('[cowidget.common.Log][appendLoggerNode] currentValue: ' + index + ': ', currentValue);
						console.error('[cowidget.common.Log][appendLoggerNode] exception: ', exception);
					}
				});
			}else if(false && Array.isArray(args)) {
				console.debug('[Log Tester] args is array');
				args.forEach((currentValue, index, array) => {
					try{
						txt = txt + (index+'x. ') + currentValue;
					}catch(exception) {
						txt = txt + ' failure';
						console.error('[cowidget.common.Log][appendLoggerNode] currentValue: ' + index + ': ', currentValue);
						console.error('[cowidget.common.Log][appendLoggerNode] exception: ', exception);
					}
				});
			}else if(false) {
				if ('object' === typeof args) {
					txt = JSON.stringify(args);
				}else if ('object' === typeof args[0]) {
					txt = SON.stringify(args[0]);			
				}else {
					txt = args[0];
				}
				
				if(args[1]) {
					txt = txt + args[1];
				}
				
			}			

			if(this.withDebug) {
				console.debug('[Log.appendLoggerNode] args: ', args);
				console.debug('[Log.appendLoggerNode] typeof args: ', typeof args);
				console.debug('[Log.appendLoggerNode] typeof Array.isArray(args): ', Array.isArray(args));
			}
			
			for (let arg of args) {
				try{
					if(this.withDebug) {
						console.debug('[Log.appendLoggerNode] typeof arg: ', typeof arg);
					}
					
					if ('undefined' === typeof arg) {
						txt = txt + 'undefined';
					}else if ('string' === typeof arg) {
						txt = txt + arg;
					}else {						
						let argTxt = JSON.stringify(arg, undefined, 2);
						
						if(this.withDebug) {
							console.debug('[Log.appendLoggerNode] arg: ', arg);
							console.debug('[Log.appendLoggerNode] argTxt: ', argTxt);
						}
						
						if(this.loggerNode.tagName.match(/textarea/i)) {
							if(this.withDebug) {
								console.debug('[Log.appendLoggerNode] loggerNode is TEXTAREA: ', this.loggerNode.tagName);
							}
						}else {
							argTxt = argTxt.replace(/\\r\\n/g, '<br/>');
							argTxt = argTxt.replace(/\\t/g, '        ');
							argTxt = argTxt.replace(/\\"/g, '"');
							
							
							argTxt = argTxt;
						}
						
						txt = txt + argTxt;
					}
				}catch(exception) {
					txt = txt + ' failure';
					console.error('[cowidget.common.Log][appendLoggerNode] arg: ', arg);
					console.error('[cowidget.common.Log][appendLoggerNode] exception: ', exception);
				}
			}
			
			if(this.withDebug) {
				console.debug('[Log.appendLoggerNode] this.loggerNode: ', this.loggerNode.tagName);
			}
			
			if(this.loggerNode.tagName.match(/textarea/i)) {
				this.loggerNode.value = this.loggerNode.value + '\r\n' + txt;
			}else {
				this.loggerNode.innerHTML = this.loggerNode.innerHTML + '<br/>' + txt ;
			}
		}
	}
	
	log(logTag, args) {
		logTag = logTag ? logTag:'INFO';
		args = args ? args:arguments;
		
		if('string' === typeof args[0]) {
			args[0] = this.getPrefixed(args, logTag) + ' ' + args[0];
		}else{
			let argTxt = this.getPrefixed(args, logTag) + ' ' + args[0];
			
			args[0] = argTxt + JSON.stringify(args[0], undefined, 2);
		}
		
		
		if(this.withDebug) {
			console.debug('[Log.log] args: ', args);
		}
		let argObj = args;
		
		//if(Array.isArray(args)) {
		//	argObj = args ? Array.from(args):Array.from(arguments);
		//}else {
		//	
		//}
		
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
		
		this.appendLoggerNode(argObj, logTag);
	}
	
	info() {
		let args = arguments;
		this.log('INFO', args);
	}
	
	debug() {
		if(this.withDebug) {
			if(Array.isArray(arguments)) {
				console.debug('[Log.debug] Object.create(arguments): ', Object.create(arguments));
			}else {
				console.debug('[Log.debug] arguments: ', arguments);
			}
		}
				
		let args = arguments;
		if(this.withDebug) {
			console.debug('[Log.debug] args: ', args);
		}
	
		
		this.log('DEBUG', args);
	}
	
	warn() {
		let args = arguments;
		this.log('WARN', args);
	}
	
	error() {
		let args = arguments;
		this.log('ERROR', args);
	}
}
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
		let self = this;
		
		console.debug('[constructor] typeof clazz: ', typeof clazz);
		if('undefined' === typeof clazz){
			this.prefixed = 'Main';
		}else if('string' === typeof clazz) {
			this.prefixed = clazz;
		}else {
			if(clazz.packageName) {
				this.prefixed = clazz.packageName + '.';
			}
			
			if(clazz.prototype.constructor.name) {
				this.prefixed = this.prefixed + clazz.prototype.constructor.name + '';
			}
		}
		
		this.debugLevel = 'INFO';
		
		if('Main' === this.prefixed || 'cowidget.commonLogFactory' === this.prefixed) {
			this.debugLevel = 'DEBUG';
		}
		
		if(CoWidget.configure && CoWidget.configure.logger) {
			if('string' === typeof CoWidget.configure.logger.root && 'DEBUG' === CoWidget.configure.logger.root) {
				this.debugLevel = CoWidget.configure.logger.root;
			}
			
			if(CoWidget.configure.logger[this.prefixed]) {
				this.debugLevel = CoWidget.configure.logger[this.prefixed];
			}
		}
		
		this.loggerNode = document.getElementById('logger');
		
		this.withDebug = false;
	}
	
	/**
	 * @parent isDebug boolean
	 */
	setDebug(isDebug) {
		this.withDebug = isDebug;
		
		return this;
	}
	
	open() {
		
		return this;
	}
	
	getPrefixed(args, logTag) {
		let prefixed = '';		
		prefixed = 'CoWLogger - ' + (logTag ? logTag.padEnd(5, ' '):emptyString.padEnd(5, ' ')) + ' [' + this.prefixed + ']';
		
		return prefixed;
	}
	
	renderLoggerNode(args, logTag) {
		let txt = '';
		if(this.loggerNode) {
			// console.debug('[renderLoggerNode] args: ', args);
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
						console.error('[cowidget.common.Log][renderLoggerNode] currentValue: ' + index + ': ', currentValue);
						console.error('[cowidget.common.Log][renderLoggerNode] exception: ', exception);
					}
				});
			}else if(false && Array.isArray(args)) {
				console.debug('[Log Tester] args is array');
				args.forEach((currentValue, index, array) => {
					try{
						txt = txt + (index+'x. ') + currentValue;
					}catch(exception) {
						txt = txt + ' failure';
						console.error('[cowidget.common.Log][renderLoggerNode] currentValue: ' + index + ': ', currentValue);
						console.error('[cowidget.common.Log][renderLoggerNode] exception: ', exception);
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
				console.debug('[cowidget.common.Log][renderLoggerNode] args: ', args);
				console.debug('[cowidget.common.Log][renderLoggerNode] typeof args: ', typeof args);
				console.debug('[cowidget.common.Log][renderLoggerNode] typeof Array.isArray(args): ', Array.isArray(args));
			}
			
			for (let arg of args) {
				try{
					if(this.withDebug) {
						console.debug('[cowidget.common.Log][renderLoggerNode] typeof arg: ', typeof arg);
					}
					
					if ('undefined' === typeof arg) {
						txt = txt + 'undefined';
					}else if ('string' === typeof arg) {
						let argTxt = arg;
						
						txt = txt + argTxt;
					}else if ('function' === typeof arg && 'function' === typeof arg.toString) {
						let argTxt = arg.toString();
						
						txt = txt + argTxt;
					}else {						
						let argTxt = JSON.stringify(arg, undefined, 2);
						
						if(this.withDebug) {
							console.debug('[cowidget.common.Log][renderLoggerNode] arg: ', arg);
							console.debug('[cowidget.common.Log][renderLoggerNode] argTxt: ', argTxt);
						}
						
						txt = txt + argTxt;
					}
				}catch(exception) {
					txt = txt + ' failure';
					console.error('[cowidget.common.Log][renderLoggerNode] arg: ', arg);
					console.error('[cowidget.common.Log][renderLoggerNode] exception: ', exception);
				}
			}
			
			if(this.withDebug) {
				console.debug('[cowidget.common.Log][renderLoggerNode] this.loggerNode: ', this.loggerNode.tagName);
			}
			
			if(this.loggerNode.tagName.match(/textarea/i)) {
				if(this.withDebug) {
					console.debug('[cowidget.common.Log][renderLoggerNode] loggerNode is TEXTAREA: ', this.loggerNode.tagName);
				}
				
				this.loggerNode.value = this.loggerNode.value + '\r\n' + txt;
			}else {
				txt = txt.replace(/\\r\\n/g, '<br/>');
				txt = txt.replace(/\\n/g, '<br/>');
				txt = txt.replace(/\\t/g, '        ');
				txt = txt.replace(/\\"/g, '"');
				
				this.loggerNode.innerHTML = this.loggerNode.innerHTML + '<code>' + txt + '<br/></code>';
			}
		}
	}
	
	log(logTag, args) {
		logTag = logTag ? logTag:'INFO';
		args = args ? args:arguments;
		
		if(null === args[0]) {
			args[0] = this.getPrefixed(args, logTag) + ' ' + args[0];
		}else if('undefined' === typeof args[0]) {
			args[0] = this.getPrefixed(args, logTag) + ' ';
			args.length = 1;
		}else if('string' === typeof args[0]) {
			args[0] = this.getPrefixed(args, logTag) + ' ' + args[0];
		}else if('function' === typeof args[0].toString) {
			args[0] = this.getPrefixed(args, logTag) + ' ' + args[0].toString();
		}
		
		if(this.withDebug) {
			console.debug('[Log.log] args: ', args);
		}
		let argObj = args;
		
		// if(Array.isArray(args)) {
		// argObj = args ? Array.from(args):Array.from(arguments);
		// }else {
		//	
		// }
		
		if('INFO' === logTag && 'INFO' === this.debugLevel) {
			console.log.apply(console, args);
		}else if('DEBUG' === logTag && 'DEBUG' === this.debugLevel) {
			console.debug.apply(console, args);
		}else if('WARN' === logTag && 'DEBUG' === this.debugLevel) {
			console.warn.apply(console, args);
		}else if('ERROR' === logTag && 'DEBUG' === this.debugLevel) {
			console.error.apply(console, args);
		}else {
			console.log.apply(console, args);
		}
		
		if('INFO' === logTag && 'INFO' === this.debugLevel) {
			this.renderLoggerNode(argObj, logTag);
		}else if('DEBUG' === logTag && 'DEBUG' === this.debugLevel) {
			this.renderLoggerNode(argObj, logTag);
		}else if('WARN' === logTag && 'DEBUG' === this.debugLevel) {
			this.renderLoggerNode(argObj, logTag);
		}else if('ERROR' === logTag && 'DEBUG' === this.debugLevel) {
			this.renderLoggerNode(argObj, logTag);
		}
		
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
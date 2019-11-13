/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development. To get sources and documentation, please visit:
 * http://cowidget.rawya.net
 */

/**
 * Factory for creating Log instances. 
 * 
 * <pre>
 * Example:
 * 
 * 	class Fork {
 * 		static get LOG() {
 * 			return cowidget.common.LogFactory.getLog(Fork);
 *		}
 *		
 *		static forkMethod() {
 *			Fork.LOG.debug('static forkMethod: ', this);
 *		}
 *		
 *		forkMethod() {
 *			Fork.LOG.debug('forkMethod: ', this);
 *		}
 * 	}
 * </pre>
 */
class LogFactory {
	
	
	/**
	 * @private
	 */
	static get LOG() {		
		if('undefined' === typeof LogFactory.__LOG) {
			Object.defineProperty(LogFactory, '__LOG', {
					value: new cowidget.common.Log(cowidget.common.LogFactory),
					writable: false
				});
		}
		
		return LogFactory.__LOG;
	}
	
	/**
	 * @private
	 */
	static _getEmpty() {
		if('undefined' === typeof LogFactory.__EMPTY) {
			class Empty {
				static get LOG() {
					return LogFactory.getLog(Empty);
				}
			}
			
			Object.defineProperty(LogFactory, '__EMPTY', {
					value: Empty,
					writable: false
				});
		}
		
		return LogFactory.__EMPTY;
	}
	
	/**
	 * @private
	 */
	static _getRegistered() {
		if('undefined' === typeof LogFactory.__LOG_REG) {
			Object.defineProperty(LogFactory, '__LOG_REG', {
					value: new Map(),
					writable: true
				});
		}
		
		return LogFactory.__LOG_REG;
	}
	
	/**
	 * @private
	 */
	static _setLog(name, /*Log*/log) {
		//LogFactory.LOG.debug('[_setLog] _setLog name: ', name);
		LogFactory._getRegistered().set(name, log);
		return log;
	}
	
	/**
	 * @private
	 */
	static _getLog(name) {
		//LogFactory.LOG.debug('[_getLog] _getLog name: ', name);
		return LogFactory._getRegistered().get(name);
	}
	
	/**
	 * Convenience method to return a named logger, without the application having to care about factories.
	 * 
	 * * @param {class}	 Class from which a log name will be derived.
	 */
	static getLog(clazz) {
		let logger;
		
		//LogFactory.LOG.debug('[getLog] typeof clazz: ', typeof clazz);
		if('function' === typeof clazz){
			logger = clazz.__LOG ? clazz.__LOG:null;
		}else if('string' === typeof clazz || 'object' === typeof clazz) {
			logger = LogFactory._getLog(clazz);
		}else {
			LogFactory.LOG.debug('[getLog] typeof clazz: ', typeof clazz);
			//logger = LogFactory._getLog('EMPTY');
			logger = LogFactory._getEmpty().LOG;
		}
		
		if(null === logger || 'undefined' === typeof logger) {
			if('function' === typeof clazz){
				Object.defineProperty(clazz, '__LOG', {
					value: new cowidget.common.Log(clazz),
					writable: false
				});
				
				logger = clazz.__LOG;
			}else if('string' === typeof clazz || 'object' === typeof clazz) {
				logger = LogFactory._setLog(clazz, new cowidget.common.Log(clazz));
				//logger = LogFactory._getLog(clazz);
			}else {
				logger = LogFactory._setLog('EMPTY', new cowidget.common.Log(LogFactory._getEmpty()));				
				//logger = LogFactory._getLog(clazz);
			}
		}
		
		//LogFactory.LOG.debug('[LogFactory.getLog] logger: ', logger);
		//logger = LogFactory.LOG;
		return logger;
	}
}
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
	
	static getMainClass() {
		return class {
			
		}
	}
	
	/**
	 * Convenience method to return a named logger, without the application having to care about factories.
	 * 
	 * * @param {class}	 Class from which a log name will be derived
	 */
	static getLog(clazz) {
		clazz = clazz ? clazz:LogFactory.getMainClass();
		
		try{
			
			if('undefined' === typeof this._registed) {
				Object.defineProperty(this, '_registed', { 
						clazz: log
					});
			}

            //console.debug('[LogFactory.getLog] clazz: ', clazz);
		}catch(exception) {
			
		}
		
		let log = new cowidget.common.Log(clazz);
		
		try{
            
			if(false){
				if('object' === typeof clazz && 'undefined' === typeof clazz.prototype.LOG) {
		            //console.debug('[LogFactory.getLog] clazz: ', clazz);
					Object.defineProperty(clazz.prototype, 'LOG', {
						value: log,
						writable: false
					});
				}
			}
		}catch(exception) {
			
		}
		
		return log;
	}
}
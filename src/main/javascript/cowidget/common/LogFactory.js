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
	 * Convenience method to return a named logger, without the application having to care about factories.
	 * 
	 * * @param {class}	 Class from which a log name will be derived.
	 */
	static getLog(clazz) {
		
//		if('undefined' === typeof clazz){
//			
//		}else if('string' === typeof clazz){
//		}else {
//			
//		}
//		//clazz = clazz ? clazz:LogFactory;
//		clazz = clazz ? clazz:(() => {
//			return class Main {
//			}
//		})();
		
//		try{
//			
//			if('undefined' === typeof this._registed) {
//				Object.defineProperty(this, '_registed', { 
//						clazz: log
//					});
//			}
//
//            console.debug('[LogFactory.getLog] clazz: ', clazz);
//		}catch(exception) {
//			console.error('[LogFactory.getLog] exception: ', exception);
//		}
		
		let logger = null;
		try{            
//			if('undefined' === typeof clazz._LOG_ || !(clazz['_LOG_'])) {				
//				Object.defineProperty(clazz, '_LOG_', {
//					value: new cowidget.common.Log(clazz),
//					writable: false
//				});
//			}
//			
//			if(clazz._LOG_) {
//				
//			}else{
//				Object.defineProperty(clazz, '_LOG_', {
//					value: new cowidget.common.Log(clazz),
//					writable: false
//				});
//			}
			
//			logger = clazz._LOG_;
		}catch(exception) {
			console.error('[LogFactory.getLog] clazzx: ', clazz);
			console.error('[LogFactory.getLog] exception: ', exception);
			logger = new cowidget.common.Log(clazz);
		}
		
		//return logger;
		return new cowidget.common.Log(clazz);
	}
}
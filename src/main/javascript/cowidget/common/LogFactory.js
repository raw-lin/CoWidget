/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development. To get sources and documentation, please visit:
 * http://cowidget.rawya.net
 */
/**
 * Example:
 * 
 * <pre>
 * static get LOG() {
 * 			return cowidget.common.LogFactory.getLog(&lt;ClassName&gt;);
 *        }
 * </pre>
 */
class LogFactory {
	
	static getLog(/* class */clazz) {
		clazz = clazz ? clazz:class Main {};
		
		let log = new cowidget.common.Log(clazz);
		
		try{
            
			if(false){
				if('object' === typeof clazz && 'undefined' === typeof clazz.prototype.LOG) {
		            console.debug('[LogFactory.getLog] clazz: ', clazz);
					Object.defineProperty(clazz.prototype, 'LOG', {
						value: log,
						writable: false
					});
					
					if('undefined' === typeof this._registed) {
						Object.defineProperty(this, '_registed', { 
								clazz: log
							});
					}
				}
			}

            //console.debug('[LogFactory.getLog] clazz: ', clazz);
		}catch(exception) {
			
		}
		
		
		return log;
	}
}
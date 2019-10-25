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
			if('object' === typeof clazz && 'undefined' === typeof clazz.prototype.LOG) {
				Object.assign(clazz.prototype, {
					LOG: log
				});
				
				if('undefined' === typeof this._registed) {
					Object.assign(this, {
						_registed: {clazz: log}
					});
				}
			}
			
		}catch(exception) {
			
		}
		
		
		return log;
	}
}
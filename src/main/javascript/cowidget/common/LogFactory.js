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
 * 		
 * get LOG() {
 * 	return this.constructor.LOG;
 * }
 * </pre>
 */
class LogFactory {
	static getLog(/* class */clazz) {
		let log = new cowidget.common.Log(clazz);
		
		if('object' === typeof clazz) {
			clazz.prototype.LOG = log;
		}
		
		return log;
	}
}
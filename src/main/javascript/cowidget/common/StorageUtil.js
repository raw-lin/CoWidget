/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class StorageUtil {
	static get LOG() {
		return mock.LogFactory.getLog(StorageUtil);
	}
	
	/**
	 * @private
	 */
	constructor(mOption) {
		new Error('failure constructor');
	}
	
	static isLive() {
		StorageUtil.LOG.debug('[isLive] live');
		
		return true;
	}
	
	static setItem() {
		localStorage.setItem('myCat', {});
	}
	
	/**
	 * <p>
	 * Formats a date into a specific pattern.yyyy MM dd HH:mm:ssZZ
	 * </p>
	 * 
	 * @param oDate
	 *            the Date Object, not null
	 * @param pattern
	 *            the pattern to use to format the date, not null
	 * @return the formatted date
	 * @since 1.0
	 */
}
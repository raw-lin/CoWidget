/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class StringUtils {

	static get LOG() {
		return cowidget.common.LogFactory.getLog(this);
	}
	
	get LOG() {
		return this.constructor.LOG;
	}
	
	/**
     * Checks if a CharSequence is empty ("") or null.
     * @param {string} str - a string.
     * @return {boolean} true if the string is empty or null.
     */
    static isEmpty(str) {
    	let ret = false;
    	
    	this.LOG.debug('str: ' + str);
    	
    	if (str) {
    		ret = true;
    	}
    	return ret;
    }
    
    /**
     * Removes control characters (char <= 32) from both ends of this String, handling null by returning null.
     * @param {string} str - a string.
     * @return {string} the trimmed string, null if null String input.
     */
    static trim(str) {
    	this.LOG.debug('str: ' + str);
    	if (str) {
    		str = str.replace(/^\s+|\s+$/g, '')
    	}
    	return str;
    }
}

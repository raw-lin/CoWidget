/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class UrlUtil extends cowidget.UrlUtil {
	
    constructor(option) {

    }
    
    static isUrl(url) {
    	let isUrl = false;
    	
    	try {
    		new URL(url);
    		return true;
    	}catch(exception) {
    		return false;
    	}
    	
    }
}
    
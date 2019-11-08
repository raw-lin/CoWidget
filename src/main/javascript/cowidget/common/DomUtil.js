/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class DomUtil  {
		
	/**
	 * TODO
	 */
	static byId(id, doc) {
			try{
	        	// dojo.byId(id, doc);
	        	
				return ((typeof id == "string") ? (doc || cowidget.lang.ClassLoader.container.document).getElementById(id) : id) || null;
			}catch(exception) {
				console.error('');
			}
     }
        
	/**
	 * TODO
	 */
	static query(selecter) {
	}
        
	/**
	 * TODO
	 */
	static ready(priority, context, callback) {
		try {
			// TODO
		    dojo.ready(priority, context, callback);
		} catch (exception) {
		    console.error('[DomUtil.ready] exception: ', exception);
	    } finally {
	
	    }
	}
}
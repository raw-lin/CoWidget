/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class Dom  {
		
	static byId(id, doc) {
			try{
	        	// dojo.byId(id, doc);
	        	
	        	return ((typeof id == "string") ? (doc || CoWidget.container.document).getElementById(id) : id) || null; // DOMNode
			}catch(exception) {
				console.error('');
			}
     }
        
	static query(selecter) {
     }
        
	static ready(priority, context, callback) {
		try {
		    dojo.ready(priority, context, callback);
		} catch (exception) {
		    console.error('[Dom.ready] exception: ', exception);
	    } finally {
	
	    }
	}
}
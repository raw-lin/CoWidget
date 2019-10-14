/*
 * Copyright (c) 2004-2016, The JS Foundation All Rights Reserved. Available via Academic Free License >= 2.1 OR the modified BSD license. see: http://dojotoolkit.org/license for details
 */

/*
 * This is an optimized version of CoWidget, built for deployment and not for development. To get sources and documentation, please visit:
 * 
 * http://cow.rawya.net
 */
'use strict';
(function() {
	console.log('[Dom] return Dom class');
	return class Dom  {
		
		static byId(id, doc) {
				try{
		        	//dojo.byId(id, doc);
		        	
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
	                console.error('[Util.ready] exception: ', exception);
	            } finally {

	            }
	        }
	};
})();

/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
 */

/*
 This is an optimized version of CoWidget, built for deployment and not for
 development. To get sources and documentation, please visit:

 http://CoWidget.rawya.net
 */
(function() {
	'use strict';
		  
	class Net {
			static xhr(xhrOptions) {
	        	xhrOptions = xhrOptions ? xhrOptions : {};
	        	
	        	return cowidget.lang.ClassLoader.xhr(xhrOptions);
	        }
	};
	
	return Net;
})();

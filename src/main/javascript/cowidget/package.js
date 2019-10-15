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
	console.log('[package.cowidget] call');
	
	var baseUrl = location.pathname.replace(/\/[^/]+$/, "") + "/";
	console.log('[package.cowidget] baseUrl: ' + baseUrl);
	console.log('[package.cowidget] baseUrl: ', location);
	
	var cowidget = {
			package: 'package.cowidget',
	};
	
	//globalObject.CoWidget = CoWidget;
	//globalObject.cowidget = CoWidget;

	return cowidget;
})();
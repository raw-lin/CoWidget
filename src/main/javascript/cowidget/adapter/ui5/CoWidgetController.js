/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */

sap.ui.define([ 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast', 'sap/m/MessageBox' ], function(Controller, JSONModel, MessageToast, MessageBox) {
	'use strict';

	let handler = {
		get : function(obj, prop) {
			console.log(`[get] obj: ${obj}`);
			console.log(`[get] prop: ${prop}`);
			return prop in obj ? obj[prop] : null;
		},

		apply : function(target, thisArg, argumentsList) {
			console.log(`[apply] Calculate sum: ${target}`);
			console.log(`[apply] Calculate sum: ${thisArg}`);
			console.log(`[apply] Calculate sum: ${argumentsList}`);
			// expected output: "Calculate sum: 1,2"

			return target(argumentsList);
		}
	};

	/**
	 * <code>
	 * <script type="text/javascript">
	 * 	jQuery.sap.registerModulePath('cowidgetUI5', './view');
	 * </script>
	 * <code>
	 */
	let CoWidgetController = Controller.extend('cowidgetUI5/CoWidgetController', {
		LOG : cowidget.common.LogFactory.getLog('cowidgetUI5.CoWidgetController'),

		constructor : function() {
			let that = this;
			that.LOG.debug('[constructor] call CoWidgetController: ', that);
			
			return null;
		}

	});
	
	CoWidgetController.extendx = function(options) {
		let that = this;
		
		return new Proxy(Controller.extend('cowidgetUI5/CoWidgetController', {
			LOG : cowidget.common.LogFactory.getLog('cowidgetUI5.CoWidgetController'),

			constructor : function() {
				let that = this;
				that.LOG.debug('[constructor] call CoWidgetController: ', that);
			}

		}), handler);
	}

	// let new Proxy(target, handler);

	// return CoWidgetController;
	return CoWidgetController;
});
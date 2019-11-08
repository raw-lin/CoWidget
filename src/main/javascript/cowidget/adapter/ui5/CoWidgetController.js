sap.ui.define([ 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/ui/base/Metadata', 'sap/m/MessageToast', 'sap/m/MessageBox' ],
		function(Controller, JSONModel, Metadata, MessageToast, MessageBox) {
	'use strict';

	let handler = {
		construct: function(target, args) {
		      var obj = Object.create(base.prototype);
		      this.apply(target, obj, args);
		      return obj;
		    },
			    
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
		LOG : cowidget.common.LogFactory.getLog('cowidgetUI5/CoWidgetController'),
		
		calledCount: 0,
		
		newInstance: function(mOptions) {
			let that = this;
			that.LOG.debug('[netInstance] call CoWidgetController: ', mOptions);
			
			return that;
		},

		constructor : function(mOptions) {
			let that = this;
			
			that.LOG.debug('[constructor] call CoWidgetController: ', that);
			that.LOG.debug('[constructor] Object.getPrototypeOf: ', Object.getPrototypeOf(Object.getPrototypeOf(that)));
			that.LOG.debug('[constructor] Object.getPrototypeOf: ', Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(that))));
			
			that.calledCount = that.calledCount + 1;
			that.LOG.debug(`[constructor] that.calledCount: ${that.calledCount}`);
			
			that._init(mOptions);
		},
		
		/**
		 * @private
		 */
		_init(mOptions) {
			let that = this;
			that.LOG.debug('[_init] call');
		},
		
		fireEvent: function(sEventId, oParameters, bAllowPreventDefault, bEnableEventBubbling) {
			let that = this;
			that.LOG.debug('[fireEvent] call: ', that);
			
			//that[[Prototype]].fireEvent();
			//Object.getPrototypeOf(Object.getPrototypeOf(that))
		},		
		
		createView: function(options, container) {
			return CoWidget.create(options, container);
		}

	});

	return CoWidgetController;
});
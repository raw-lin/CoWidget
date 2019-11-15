sap.ui.define([ 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/ui/base/Metadata', 'sap/m/MessageToast', 'sap/m/MessageBox' ],
		function(Controller, JSONModel, Metadata, MessageToast, MessageBox) {
	'use strict';

	let LOG = cowidget.common.LogFactory.getLog('CoWidgetController');

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
		
// newInstance: function(mOptions) {
// let that = this;
// that.LOG.debug('[netInstance] call CoWidgetController: ', mOptions);
//			
// return that;
// },
		
		constructor : function(mOptions) {
			let that = this;
			
			that.LOG.debug('[constructor] call CoWidgetController: ', that);
			that.LOG.debug('[constructor] CoWidgetController Object.getPrototypeOf: ', Object.getPrototypeOf(Object.getPrototypeOf(that)));
			that.LOG.debug('[constructor] CoWidgetController Object.getPrototypeOf: ', Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(that))));
			
			that.calledCount = that.calledCount + 1;
			that.LOG.debug(`[constructor] that.calledCount: ${that.calledCount}`);
			
			that._init(mOptions);
			
			return that;
		},
		
		/**
		 * @private
		 */
		_init(mOptions) {
			let that = this;
			that.LOG.debug('[_init] CoWidgetController call: ', that);
		},
		
		onInit : function() {
			var that = this;
			that.LOG.debug('[onInit] CoWidgetController call');
		},
		
		fireEvent: function(sEventId, oParameters, bAllowPreventDefault, bEnableEventBubbling) {
			let that = this;
			that.LOG.debug('[fireEvent] CoWidgetController call: ', that);
			
			// that[[Prototype]].fireEvent();
			// Object.getPrototypeOf(Object.getPrototypeOf(that))
		},		
		
		createView: function(options, container) {
			return CoWidget.create(options, container);
		},
		
		postView: function(/*method, */ options, container, place) {
			let that = this;
			
			options = options ? options:{};

			that.LOG.debug('[postView] that: ', that);
			that.LOG.debug('[postView] options: ', options);
			

			that.LOG.debug('[postView] that.viewMotion: ', that.viewMotion);
			that.LOG.debug('[postView] options.viewMethod: ', options.viewMethod);
			// viewMotion and viewName
			// request viewMotion?viewMethod
			// viewResult is josn
			
			let viewResult = {
					"viewName" : "view/common/Reload",
					"viewModel" : that.viewModel
			}
			
			return that.createView(viewResult, container).placeAt(place);
		},

	});
	
	const _extend = CoWidgetController.extend;
	LOG.debug('[extend] _extend: ', _extend);
	CoWidgetController.extendX = function() {
		//Let LOG = cowidget.common.LogFactory.getLog('CoWidgetController.extend');
		//const extend = CoWidgetController.extend;
		//LOG.debug('[extend] extend: ', extend);
		//LOG.debug('[extend] arg: ', arg);
		
		//let extObj = Controller.extend(argim);
		//let extObj = Controller.extend.apply(CoWidgetController, arguments);
		let extObj = Reflect.apply(_extend, undefined, arguments);
		LOG.debug('[extend] extObj: ', extObj);
		
		//return extObj;
		return new Proxy(extObj, proxyHandler);
	};
			
	const proxyHandler = {
		LOG : cowidget.common.LogFactory.getLog(this),
		constructX : function(target, args) {
			this.LOG.debug('[proxyHandler.construct] target: ', target);
			this.LOG.debug('[proxyHandler.construct] args: ', args);
			// const obj = Object.create(base.prototype);
			//const obj = Object.create(target.prototype);
			//this.apply(target, obj, args);
			//return obj;
			//return Reflect.set(...arguments);
			return target.construct(...arguments);
		},
		
		get: function(obj, prop, receiver) {
			let retProp = null;
			this.LOG.debug(`[proxyHandler.get] prop: ${typeof prop}`, prop);
			this.LOG.debug('[proxyHandler.get] obj: ', obj);
			
			if ('string' === typeof prop && 'extend' === prop) {
				retProp = obj[prop];
				
				//retProp = () => {
				//	return new Proxy(obj[prop], proxyHandler);
				//};
			}else if ('string' === typeof prop && 'prototype' === prop) {
				retProp = obj[prop];
				
				retProp = new Proxy(obj[prop], proxyHandler);
			}else {
				retProp = obj[prop];
			}
			
			return retProp;
		},
		
		set: function(obj, prop, value) {
			this.LOG.debug('[proxyHandler.get] obj: ', obj);
			
			return Reflect.set(...arguments);
		},
		
		defineProperty : function(target, key, descriptor) {
			this.LOG.debug('[proxyHandler.defineProperty] key: ', key);
			
			return true;
		},
		
		apply : function(target, thisArg, argumentList) {
			this.LOG.debug('[proxyHandler.apply] argumentList: ', argumentList);
			return target(argumentList);
		}
	}
	
	let proxy = new Proxy(CoWidgetController, proxyHandler);
	
	// let descriptor =
	// Object.getOwnPropertyDescriptor(CoWidgetController.prototype,
	// 'constructor');
	// descriptor.value = proxy;
	// Object.defineProperty(CoWidgetController.prototype, 'constructor',
	// descriptor);
	
//	return class extends (()=>{
//		return new Proxy(CoWidgetController, proxyHandler);;
//	})() {
//		
//	};
	return CoWidgetController;
	// return new Proxy(CoWidgetController, ClassLoader.getProxyHandler());
});
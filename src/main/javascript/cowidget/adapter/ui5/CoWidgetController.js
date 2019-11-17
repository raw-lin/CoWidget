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
		
		viewModel: null,
		
		calledCount: 0,
		
		constructor : function(mOptions) {
			let that = this;
			
			that.LOG.debug('[constructor] CoWidgetController call');
			//that.LOG.debug('[constructor] CoWidgetController: ', that);
			//that.LOG.debug('[constructor] CoWidgetController Object.getPrototypeOf: ', Object.getPrototypeOf(Object.getPrototypeOf(that)));
			//that.LOG.debug('[constructor] CoWidgetController Object.getPrototypeOf: ', Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(that))));
			
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
			
			
			
//			let customData = that.getView().getCustomData();
//			let viewModel;
//			customData.forEach(function(element) {
//				if('viewModel' === element.getKey()) {
//					that.viewModel = element.getValue();
//				}
//			});
		},
		
		setModel: function(viewModel) {
			let that = this;
			that.model = new JSONModel(viewModel);
		},
		
		getModel: function() {
			let that = this;
			return that.model.oData;
		},	
		
		fireEvent: function(sEventId, oParameters, bAllowPreventDefault, bEnableEventBubbling) {
			let that = this;
			that.LOG.debug('[fireEvent] CoWidgetController call: ', that);
			
			// that[[Prototype]].fireEvent();
			// Object.getPrototypeOf(Object.getPrototypeOf(that))
		},		
		
		createView: function(options, container) {
			return CoWidget.createView(options, container);
		},
		
		xhrView: function(/* method */ options, container) {
			let that = this;
			
			options = options ? options:{};

			that.LOG.debug('[postView] that: ', that);
			that.LOG.debug('[postView] options: ', options);
			

			that.LOG.debug('[postView] that.viewMotion: ', that.viewMotion);
			that.LOG.debug('[postView] options.viewMethod: ', options.viewMethod);
			// viewMotion and viewName
			// request viewMotion?viewMethod
			// viewResult is josn
			
			return CoWidget.xhrView(options, container);
			//return that.createView(viewResult, container);
		},
		
		/**
		 * TODO
		 */
		resetInputValueState : function(oView) {
		
			//sap.ui.getCore().byId(
			jQuery(jQuery.sap.byId(oView.sId)).find('[id]').each(function(iIndex, node) {
				var id = jQuery(node).attr('id');
				
				var oInput = oView.byId(jQuery(node).attr('id'));
				if (oInput && oInput.setValueState) {
					oInput.setValueState('None');
				}
				
				if (oInput && oInput.setValueStateText) {
					oInput.setValueStateText('');
				}
			});
		},
		
		/**
		 * TODO
		 * <pre>
		 * constructor : function() {
		 * 		var that = this;
		 * 		return tarolsui.TarolsUtil.pluginView(that, {
		 * 			viewAction : '/net.tarols.webapp/Shell.do'
		 * 		});
		 * },
		 * </pre>
		 */
		pluginView : function(target, mOptions) {
			mOptions = (mOptions) ? mOptions : {};
	
			var viewAction = mOptions.viewAction;
			var handler = {};
			// jQuery(sap.ui.core.mvc.View, {});
	
			// sap.ui.core.Control.getMetadata()
			var viewName = target.getMetadata().getName();
	
			jQuery.extend(target, {
				viewName : viewName,
				viewAction : viewAction
			});
	
			console.debug('[TarolsUtil.pluginView] target: ', target);
	
			jQuery.sap.require('sap.ui.model.json.JSONModel');
			var oModel = new sap.ui.model.json.JSONModel({});
			// if(target.getView && target.getView().setModel) {
			// target.getView().setModel(oModel);
			// }
	
			return new Proxy(target, /* oTarolsHandler */ null);
		}

	});
	
	const proxyHandler = (proxyObj) => {
		proxyObj = proxyObj ? proxyObj:{};
		let LOG = cowidget.common.LogFactory.getLog(proxyObj);
		
		return {
			LOG : LOG,
			proxyObj : proxyObj,
			
			construct : function(target, args) {
				this.LOG.debug('[proxyHandler.construct] target: ', target);
				this.LOG.debug('[proxyHandler.construct] args: ', args);
				// const obj = Object.create(base.prototype);
				// const obj = Object.create(target.prototype);
				// this.apply(target, obj, args);
				// return obj;
				// return Reflect.set(...arguments);
				return Reflect.apply(target, undefined, args);
			},
			
			get: function(obj, prop, receiver) {
				let retProp = null;
				this.LOG.debug(`[proxyHandler.get] prop, obj: ${typeof prop}`, prop, obj);
				// this.LOG.debug('[proxyHandler.get] obj: ', obj);
				
				if ('symbol' === typeof prop) {
					retProp = function(hint) {
                        return obj.prop;
                    };
				}else if ('string' === typeof prop && 'extend' === prop) {
					//retProp = obj[prop];
					retProp = Reflect.get(obj, prop, receiver);
					
					retProp = ((obj, retProp, receiver) => {	
						return new Proxy(retProp, proxyHandler(retProp))
						//return Reflect.get(obj, prop, receiver);
					})(obj, retProp, receiver);
				}else if ('string' === typeof prop && 'prototype' === prop) {
					retProp = obj[prop];
			
					retProp = new Proxy(retProp, proxyHandler('prototype'));
				}else if ('string' === typeof prop && 'connectToView' === prop) {
					retProp = obj[prop];
					
					// retProp = new Proxy(obj[prop], proxyHandler);
				}else if(obj[prop]){
					//retProp = obj[prop];
					retProp = Reflect.get(obj, prop, receiver);
				}else {
					retProp = () => {
						return `${this.proxyHandlerName}`;
					}
				}
				
				return retProp;
			},
			
			setX: function(obj, prop, value) {
				this.LOG.debug('[proxyHandler.set] obj: ', obj);
				
				return Reflect.set(...arguments);
			},
			
			definePropertyX : function(target, key, descriptor) {
				this.LOG.debug('[proxyHandler.defineProperty] key: ', key);
				
				return true;
			},
			
			apply : function(target, thisArg, args) {
				this.LOG.debug(`[proxyHandler.apply] target, thisArg, args: ${target}, ${thisArg}, ${args}`);
				
				return Reflect.apply(target, thisArg, args);
			}
		}
	}
	
	//return CoWidgetController;
	return new Proxy(CoWidgetController, proxyHandler(CoWidgetController));
});
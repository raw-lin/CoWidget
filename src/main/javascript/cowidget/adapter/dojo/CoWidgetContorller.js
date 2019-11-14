/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
define([ 'dojo/_base/declare'
			, 'dojo/parser'
			, 'dijit/registry'
			, 'dojo/request/xhr'
			, 'dojo/json'
			, 'dijit/_WidgetBase'
			, 'dijit/_TemplatedMixin'
			
			, 'dojox/mvc'
			, 'dojox/mvc/StatefulModel'
			, 'dojox/mvc/EditModelRefController'
			, 'dojox/mvc/ModelRefController'
			
			, 'dojox/layout/FloatingPane'
			//, 'dojo/domReady!'
], function(declare, parser, registry, xhr, JSON, _WidgetBase, _TemplatedMixin, mvc, StatefulModel, EditModelRefController, ModelRefController, FloatingPane) {
	//'use strict'; /* important: dont need */
	
	let CoWidgetContorller = declare("cowidgetDojo.CoWidgetContorller", [_WidgetBase, _TemplatedMixin], {
		
		LOG: cowidget.common.LogFactory.getLog('cowidgetDojo.CoWidgetContorller'),
		
		// ctrl: dojox.mvc.ModelRefController
		//		The controller that the form widgets in the template refer to.
		//ctrl: null,
		
		/*
		 * model = new StatefulModel({data: self.viewModel});
		 * self.setModel(model);
		 */
		_model: null, /*StatefulModel from chirdlen*/
		
		_messages: [],
		putMessage: function(message) {
			_messages.push(message);
		},
		
		_errors: [],
		
		putError: function(error) {
			_errors.push(error);
		},
		
		hasErrors: function() {
			return false;
		},

		constructor: function (options) {
			let self = this;
			options = options ? options:{};
			self.LOG.debug('[constructor] CoWidgetContorller');

			//self.LOG.debug('[constructor] self: ', self);
			self._init(options);
		},
		
		_init: function(options) {
			let self = this;
			self.LOG.debug('[_init] self: ', self);
			
			options = options ? options:{};
			self.LOG.debug('[_init] options: ', options);
			
			if(true && 'function' === typeof self.setModel && options.viewModel) {
				Object.assign(self, {
					viewModel: options.viewModel
				});
				
				//self.setModel(options.viewModel);
				//self.setModel(new StatefulModel({data: {}}));
				
				self.LOG.warn(`[setModel] self.get('model'): `, self.get('model'));
				
				if(true && 'function' === typeof self.getModel) {
					self.getModel().set(options.viewModel ? options.viewModel:{});
					self.getModel().set({data: (options.viewModel ? options.viewModel:{})});
				}
			} 
		},
		
		postCreateAfter: function(model) {
			let self = this;
			self.LOG.debug('[postCreateAfter] self: ', self);

			//self.model = new Stateful(model);
		},
		
		postCreate: function() {
			let self = this;
			this.inherited(arguments);
			
			self.LOG.debug('[postCreate] self: ', self);
			
			{
				// plugin ajax event
				//press="onPress"
				self.LOG.debug('[postCreate] dojo.query: ', dojo.query('button[type="reset"]', self.domNode));
				let buttons = dojo.query('[type="reset"]', self.domNode).on('click', function() {
					//dojo.stopEvent(evt);
					//alert('reset');
					//self.LOG.debug('[postCreate] self: ', self);
					// ajax submit
				});

				// plugin in form, href, button to ajax.
				self._pluginAjax();
			}
			
			if('function' === typeof self.postCreateAfter){
				self.postCreateAfter();
			}
		},
		
		createView: function(mOption, comtainer) {
			return CoWidget.create(mOption, comtainer);
		},
		
		
		/**
		 * @private
		 */
		_pluginAjax: function() {
			let self = this;
			
			let withMock = true;
			
			dojo.query('button[type="submit"]', self.domNode).on('click', function(evt) {
				let selfDomNode = this;
				dojo.stopEvent(evt);
				
				alert('show loading....');

				self.LOG.debug('[_pluginAjax.click] self: ', self);

				let buttonName = dojo.attr(selfDomNode, 'name');
				//alert('submit: ' + buttonName);
				self.LOG.debug('[_pluginAjax.click] buttonName: ', buttonName);
				
				//if(self.hasOwnProperty(buttonName)) {
				let withXhrReq = true;
				if(self[buttonName]) {
					withXhrReq = Reflect.apply(self[buttonName], self, []);//self.apply(self, buttonName, arguments);
					
					self.LOG.debug('[_pluginAjax.click] withXhrReq: ', withXhrReq);
				}
				
				if (withXhrReq) {
					let formDom = null;
					dojo.query('form', self.dom).forEach(function(entry, i) {
						formDom = entry
					});
					
					let postData = JSON.stringify(self.getModel()); //OK
					//postData = JSON.parse(jsonString);
															
					let queryMethod = 'method:' + buttonName; // for struts2
					let viewUrl = formDom ? dojo.attr(formDom, 'action'):'#';
					viewUrl = self.viewMotion ? self.viewMotion:'#';
					
					self.LOG.debug(`[postCreate.click] viewMethod, viewUrl, postData: ${queryMethod}, ${viewUrl}, `, postData);
					let xhrArgs = {
						url : viewUrl,
						method: 'POST',
						query: `!${queryMethod}`, // for struts2
						data : postData,
						preventCache: false,
						//async
						headers: {
							'Content-Type': 'application/json;charset=UTF-8'
						},
						handleAs : 'json'
					};
					
					self.LOG.debug('[_pluginAjax.click] xhrArgs: ', xhrArgs);
					
					let widget = self;
					xhr(xhrArgs.url, xhrArgs).then((data) => {
						// Do something with the handled data
						widget.LOG.debug('[_pluginAjax.xhr.then] xhrArgs data: ', data);
						widget.LOG.debug('[_pluginAjax.xhr.then] queryMethod: ', queryMethod);
						
						if(withMock) {
							
						}else {
							
						}
						// mock service, choice user case
						let caseId = 1;
						let coWidgetOpts = data[queryMethod][caseId+''];
						widget.LOG.debug('[_pluginAjax.xhr.then] coWidgetOpts: ', coWidgetOpts);
						
						if(true){
							if(coWidgetOpts.message) {
								if(coWidgetOpts.message.error) {
									/* join error*/
									for (let [key, value] of Object.entries(coWidgetOpts.message.error)) {
										if(Array.isArray(value)) {
											alert(value.join('\n'));
										}
										
									}
									
								}
							}
						}
						
						if('function' === typeof self.getModel) {
							self.LOG.debug('[_pluginAjax.xhr.then] self.viewModel: ', self.viewModel);
							self.LOG.debug('[_pluginAjax.xhr.then] model: ', model);
						}else {
							widget.LOG.warn('[_pluginAjax.xhr.then] please implement getModel');
						}
						
						if('function' === typeof self.getModel) {
							self.setModel(coWidgetOpts.model);
						}else {
							widget.LOG.warn('[_pluginAjax.xhr.then] please implement setModel');
						}
						
						let coWidgetView = CoWidget.create({
							//container : document,
							viewName : coWidgetOpts.viewName,
							viewPlace : coWidgetOpts.viewPlace ? coWidgetOpts.viewPlace:null,
							viewModel : coWidgetOpts.viewModel ? coWidgetOpts.viewModel:{}
						}, self.domNode);
						
						coWidgetView.placeAt(coWidgetOpts.viewPlace);
	
					}, (err) => {
						widget.LOG.error('[_pluginAjax.xhr.err] err: ', err);
					}, (evt) => {
						widget.LOG.debug('[_pluginAjax.xhr.evt] evt: ', evt);
					});
				}
			});
		},
		
		/**
		 * @abstract
		 */
		getModel: function () {
			let self = this;

			if ('undefined' === typeof model || 'undefined' === typeof model.set) {
				self.LOG.debug(`[getModel] model is undefined`);
				self.LOG.warn(`[getModel] self.get('model'): `, self.get('model'));
				model = new StatefulModel({data: {}}); //ok
				//self.set('model', model);
				//model = mvc.newStatefulModel({ data : { logon : {message: 'xx'}}}); //ok
				// model = getStateful({});
				//model = new mvc.getStateful({});
				//model = new mvc.EditModelRefController(sourceModel: mvc.getStateful());


				self.LOG.warn(`[getModel] self.get('model'): `, self.get('model'));
			}
			
			self.LOG.debug(`[getModel] model: `, model);

			return model;
		},
		
		/**
		 * @abstract
		 */
		setModel: function(_model){
			let self = this;
			
			//self.set('model', self.getModel());
			self.LOG.warn(`[setModel] self.get('model'): `, self.get('model'));
			self.LOG.warn(`[setModel] call _model: `, _model);
		},
		
		/**
		 * @abstract
		 */
		execute: function(){
			let self = this;
			self.LOG.debug(`[execute] call.`);
		},
		
		none : null

	});
	
	return CoWidgetContorller;
});

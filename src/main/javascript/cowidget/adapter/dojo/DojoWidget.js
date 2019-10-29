/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
define([ 'dojo/_base/declare'
			, 'dojo/parser'
			, 'dojo/request/xhr'
			, 'dojo/json'
			, 'dijit/_WidgetBase'
			, 'dijit/_TemplatedMixin'
			
			, 'dojox/mvc/at'
			, 'dojox/mvc/StatefulModel'
			, 'dojox/mvc/EditModelRefController'
			, 'dojox/mvc/ModelRefController'
			
			//, 'dojo/domReady!'
], function(declare, parser, xhr, JSON, _WidgetBase, _TemplatedMixin, at, StatefulModel, EditModelRefController, ModelRefController) {
	'use strict';

	let DojoWidget = declare('cowidget.DojoWidget', [_WidgetBase, _TemplatedMixin], {
		
		LOG: cowidget.common.LogFactory.getLog('cowidget.DojoWidget'),
		
		// ctrl: dojox.mvc.ModelRefController
		//		The controller that the form widgets in the template refer to.
		//ctrl: null,
		_model: null, /*StatefulModel*/
		
		getModel: function() {
			let self = this;
			//self.LOG.debug('[getModel] self._model: ', self._model);
			//return self._model ? self._model:new StatefulModel({data: self.modelData});
			return self._model;
		},
		
		setModel: function(model) {
			let self = this;
			
			self._model = model;
			
			return model;
		},
		
		constructor: function (options) {
			let self = this;
			options = options ? options:{};
			self.LOG.debug('[constructor] DojoWidget');
			
			self._init(options);
		},
		
		_init: function(options) {
			let self = this;
			options = options ? options:{};
			
			self.LOG.debug('[_init] options: ', options);
		},
		
		postCreateAfter: function(model) {
			let self = this;
			self.LOG.debug('[postCreateAfter] self: ', self);
			
			//self.model = new Stateful(model);
		},
		
		rebuildRendering: function() {
			let self = this;

			self.LOG.debug('[rebuildRendering] self: ', self);
			
			self._rendered = false;
			self.buildRendering();

			self.postCreate();
			self.placeAt('coWidget', 'only');
		},
		
		placeAtt: function(reference, position) {
			//super.placeAt(reference, position);
			//return this.inherited('placeAt', arguments);
			//_WidgetBase.placeAt(reference, position);
		},
		
		postCreate: function() {
			let self = this;
			self.LOG.debug('[postCreate] self: ', self);
			
			{
				// plugin ajax event
				self.LOG.debug('[postCreate] dojo.query: ', dojo.query('button[type="reset"]', self.domNode));
				let buttons = dojo.query('button[type="reset"]', self.domNode).on("click", function() {
					alert('reset');
					self.LOG.debug('[postCreate] self: ', self);
					// ajax submit
				});

				dojo.query('[type="submit"]', self.domNode).on('click', function(evt) {
					dojo.stopEvent(evt);
					
					self.LOG.debug('[postCreate] button: ', this);
					//self.LOG.debug('[DojoWidget.postCreate] self: ', self);
					//self.LOG.debug('[DojoWidget.postCreate] self: ', self);
					self.LOG.debug('[postCreate] self.model: ', self.getModel());
					self.LOG.debug('[postCreate] self.model.toPlainObject(): ', self.getModel().toPlainObject());
					self.LOG.debug('[postCreate] self.ctrl: ', self.ctrl);
					self.LOG.debug('[postCreate] button form: ', dojo.query('form', self.dom));
					
					// plugin in form, href, button to ajax.

					let buttonName = dojo.attr(this, 'name');
					alert('submit: ' + buttonName);
					console.debug('[postCreate] buttonName: ', buttonName);

					let formDom = null;
					dojo.query('form', self.dom).forEach(function(entry, i) {
						formDom = entry
					});
					
					let postData = dojo.formToObject(formDom);
					postData = self.getModel().toPlainObject();
					postData = JSON.stringify(postData);
					//postData = JSON.parse(jsonString);
					console.debug('[postCreate.click] postData: ', postData);
					
					let xhrArgs = {
						url : dojo.attr(formDom, 'action'),
						method: 'POST',
						query: '!' + buttonName,
						data : postData,
						preventCache: false,
						//postData: postData,
						//sync
						headers: {
							'Content-Type': 'application/json;charset=UTF-8'
						},
						handleAs : 'json',
						loadX : function(data) {
							self.LOG.debug('[postCreate.load] xhrArgs data: ', data);
							
							// mock service, choice user case
							let coWidgetOpts = data[buttonName]['1'];
							self.LOG.debug('[postCreate.load] coWidgetOpts: ', coWidgetOpts);

							self.setModel(coWidgetOpts.model);							
							self.rebuildRendering();
						},
						error : function(error) {
							// We'll 404 in the demo, but that's okay. We don't have
							// a 'postIt' service on the
							// docs server.
							// dojo.byId("response").innerHTML = "Form posted.";
						}
					};
					
					let widget = self;
					xhr(xhrArgs.url, xhrArgs).then(function(data){
							// Do something with the handled data
							widget.LOG.debug('[postCreate.then] xhrArgs data: ', data);
							
							// mock service, choice user case
							let coWidgetOpts = data[buttonName]['1'];
							widget.LOG.debug('[postCreate.then] coWidgetOpts: ', coWidgetOpts);
	
							model.set('data', coWidgetOpts.model);
							//widget.getModel().set('data', coWidgetOpts.model);							
							//widget.rebuildRendering();
						}, function(err){
							widget.LOG.error('[postCreate.then] coWidgetOpts: ', err);
						}, function(evt){
							widget.LOG.error('[postCreate.then] supports XHR2 coWidgetOpts: ', evt);
							// Handle a progress event from the request if the
							// browser supports XHR2
						});
				});
			}
			
			if(self.postCreateAfter){
				self.postCreateAfter();
			}
			
			parser.parse(self.domNode);
		},
		
		none : null

	});
	
	console.debug('[DojoWidget] return.');
	return DojoWidget;
});

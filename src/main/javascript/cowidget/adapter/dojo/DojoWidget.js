/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
define([ 'dojo/_base/declare'
			, 'dojo/parser'
			, 'dijit/_WidgetBase'
			, 'dijit/_TemplatedMixin'
			
			//, 'dojo/domReady!'
], function(declare, parser, _WidgetBase, _TemplatedMixin) {
	'use strict';

	var DojoWidget = declare('cowidget.DojoWidget', [_WidgetBase, _TemplatedMixin], {
		
		LOG: cowidget.common.LogFactory.getLog('cowidget.DojoWidget'),
		
		constructor:  function(options) {
			
		},
		
		postCreateAfter: function(model) {
			let self = this;
			self.LOG.debug('[postCreateAfter] self: ', self);
			
			//self.model = new Stateful(model);
		},
		
		getModel: function() {
			let self = this;
			
			return self['model'];
		},
		
		setModel: function(model) {
			let self = this;
			
			model = model ? model:{};
			
			self['model'] = model;
			
			return self;
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
				self.LOG.debug('[DojoWidget.postCreate] dojo.query: ', dojo.query('button[type="reset"]', self.domNode));
				let buttons = dojo.query('button[type="reset"]', self.domNode).on("click", function() {
					alert('reset');
					self.LOG.debug('[DojoWidget.postCreate] self: ', self);
					// ajax submit
				});

				dojo.query('[type="submit"]', self.domNode).on("click", function(evt) {
					dojo.stopEvent(evt);
					
					self.LOG.debug('[DojoWidget.postCreate] button: ', this);
					self.LOG.debug('[DojoWidget.postCreate] self: ', self);
					self.LOG.debug('[DojoWidget.postCreate] self.model: ', self.model);
					self.LOG.debug('[DojoWidget.postCreate] button form: ', dojo.query('form', self.dom));

					// plugin in form, href, button to ajax.

					let buttonName = dojo.attr(this, 'name');
					alert('submit: ' + buttonName);
					console.debug('[DojoWidget.postCreate] buttonName: ', buttonName);

					let formDom = null;
					dojo.query('form', self.dom).forEach(function(entry, i) {
						formDom = entry
					});
					
					let xhrContent = dojo.formToObject(formDom);
					
					let xhrArgs = {
						url : dojo.attr(formDom, 'action') + '?!' + buttonName,
						form : formDom,
						handleAs : 'json',
						load : function(data) {
							self.LOG.debug('[postCreate.load] xhrArgs data: ', data);
							
							// mock
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
					
					dojo.xhrPost(xhrArgs);
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

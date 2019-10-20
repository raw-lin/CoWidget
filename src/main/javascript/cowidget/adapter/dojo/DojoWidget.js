/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
define([ "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojox/mvc/at", "dojo/Stateful", "dojo/parser", "dojo/dom-style", "dojo/_base/fx",
		"dojo/_base/lang", "dojo/on", "dojo/mouse", "require", 'dojo/string', 'dojox/mvc/EditModelRefController', 'dijit/_WidgetsInTemplateMixin'
], function(declare, _WidgetBase, _TemplatedMixin, at, Stateful, parser, domStyle, baseFx, lang, on, mouse, require, string, _WidgetsInTemplateMixin) {
	'use strict';

	var DojoWidget = declare("cowidget.Widget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		
		at: null,
		ctrl: null,
		
		//model : null,
		
		buildRenderingX : function() {
			let self = this;
			console.log('[DojoWidget.buildRendering] self: ', self);
			
			//super.buildRendering();
		},
		
		postCreateAfter: function(model) {
			let self = this;
			console.log('[DojoWidget.postCreateAfter]');
			
			//self.model = new Stateful(model);
		},
		
		buildRenderingx: function(){
			console.log("call myMvcTemplated buildRendering");
			//window.at = at;		
			//this.inherited(arguments);
		},
		
		postCreate : function() {
			let self = this;
			// Get a DOM node reference for the root of our widget
			var domNode = self.domNode;
			domNode.at = at;
			//self.set('model', new Stateful(self.model));
			//self.set('model', {});
			
			self.model = new dojo.Stateful({model: {
            	field01 : '1',
            	field02 : '2'
            }});
			domNode.model = self.model;
			parser.parse();
			console.log('[DojoWidget.postCreate] self: ', self);
			console.log('[DojoWidget.postCreate] model: ', self.model);
			console.log('[DojoWidget.postCreate] templatePath: ', self.templatePath);
			
			{
				// plugin ajax event


				console.log('[DojoWidget.postCreate] dojo.query: ', dojo.query('button[type="reset"]', domNode));
				let buttons = dojo.query('button[type="reset"]', domNode).on("click", function() {
					alert('reset');
					console.log('[DojoWidget.postCreate] self: ', self);
					// ajax submit
				});

				dojo.query('[type="submit"]', domNode).on("click", function(evt) {
					dojo.stopEvent(evt);
					
					self.model.set('field02', 'xxxx');
					console.log('[DojoWidget.postCreate] button: ', this);
					console.log('[DojoWidget.postCreate] self: ', self);
					console.log('[DojoWidget.postCreate] self: ', self.model);
					console.log('[DojoWidget.postCreate] button form: ', dojo.query('form', self.dom));

					// plugin in form, href, button to ajax.

					let buttonName = dojo.attr(this, 'name');
					alert('submit: ' + buttonName);

					var formDom = null;
					dojo.query('form', self.dom).forEach(function(entry, i) {
						formDom = entry
					});
					var xhrArgs = {
						url : dojo.attr(formDom, 'action') + '?!' + buttonName,
						form : formDom,
						handleAs : 'json',
						load : function(data) {
							console.log('[DojoWidget.postCreate] xhrArgs data: ', data);
							
							// mock
							let coWidgetOpts = data[buttonName][0];
							console.log('[DojoWidget.postCreate] coWidgetOpts: ', coWidgetOpts);
							
							self.model = new Stateful(coWidgetOpts.model);
							
							//self.set('model', coWidgetOpts.model);
							//self.postMixInProperties();
							//new CoWidget(coWidgetOpts).placeAt();
						},
						error : function(error) {
							// We'll 404 in the demo, but that's okay. We don't have
							// a 'postIt' service on the
							// docs server.
							// dojo.byId("response").innerHTML = "Form posted.";
						}
					}
					// Call the asynchronous xhrPost
					// dojo.byId("response").innerHTML = "Form being sent..."
					//var deferred = dojo.xhrPost(xhrArgs);
				});
			}
			
			self.postCreateAfter();
		},
		
		none : null

	});

	return DojoWidget;
});

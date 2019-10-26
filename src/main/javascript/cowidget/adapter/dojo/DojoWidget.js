/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
define([ "dojo/_base/declare"
			, "dojox/mvc/Templated"
			//, "dijit/_WidgetsInTemplateMixin"
			, "dijit/_WidgetBase"
			, "dijit/_TemplatedMixin"
			, "dojox/mvc/at"
			, "dojox/mvc/getStateful"
			, "dojo/Stateful"
			, "dojox/mvc/ModelRefController"
			, "dojo/parser"
			, "dojo/_base/lang"
			, "dojo/on"
], function(declare, Templated, _WidgetBase, _TemplatedMixin, at, getStateful, Stateful, ModelRefController, parser, lang, on) {
	'use strict';

	var DojoWidget = declare('cowidget.DojoWidget', [_WidgetBase, _TemplatedMixin], {
		// ctrl: dojox.mvc.ModelRefController
		//		The controller that the form widgets in the template refer to.
		//ctrl: null,
		//at: at,
		
		constructor: function(options){
			let self = this;
			self.at = at;
			console.log('[DojoWidget.constructor] options: ', options);

			//self.model = options.modelDate1;
			//self.model = new Stateful(options.modelDate1);
			self.model = getStateful({value: "Foo"});
			
			self.ctrl = new ModelRefController({model: getStateful(options.modelDate)});
			
			console.log('[DojoWidget.constructor] self: ', self);
		},
		
		postCreateAfter: function(model) {
			let self = this;
			console.log('[DojoWidget.postCreateAfter]');
			
			//self.model = new Stateful(model);
		},
		
		postCreate : function() {
			let self = this;
			//at();
			console.log('[DojoWidget.postCreate] self: ', self);
			console.log('[DojoWidget.postCreate] self.domNode: ', self.domNode);
			
			//dojo.require('dojox.mvc.getStateful');
			//self.domNode.at = at;
			//self.model = dojox.mvc.getStateful(self.modelDate1);
			
			//self.model = new Stateful(self.modelDate);
			//self.model = new Stateful({model: self.modelDate});
			//self.ctrl = new ModelRefController({model: model});
			self.model = getStateful(self.model1);
			//self.model = new ctrl(self.model);
			console.log('[DojoWidget.postCreate] at: ', at('field01', 'value'));
			
			{
				// plugin ajax event
				console.log('[DojoWidget.postCreate] dojo.query: ', dojo.query('button[type="reset"]', self.domNode));
				let buttons = dojo.query('button[type="reset"]', self.domNode).on("click", function() {
					alert('reset');
					console.log('[DojoWidget.postCreate] self: ', self);
					// ajax submit
				});

				dojo.query('[type="submit"]', self.domNode).on("click", function(evt) {
					dojo.stopEvent(evt);
					
					console.log('[DojoWidget.postCreate] button: ', this);
					console.log('[DojoWidget.postCreate] self: ', self);
					console.log('[DojoWidget.postCreate] self.model: ', self.model);
					console.log('[DojoWidget.postCreate] button form: ', dojo.query('form', self.dom));

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
							console.log('[DojoWidget.postCreate] xhrArgs data: ', data);
							
							// mock
							let coWidgetOpts = data[buttonName][0];
							console.log('[DojoWidget.postCreate] coWidgetOpts: ', coWidgetOpts);
							

							let model = new dojo.Stateful({
				            	field01 : {
				            		value: 'DojoWidget 1'
				            		},
				            	field02 : {
				            		value: 'DojoWidget 2'
				            	}});

							console.debug('[DojoWidget.postCreate] self.model: ', self.model);
							console.debug('[DojoWidget.postCreate] self.model.get: ', self.model.get('field01'));
							//self.model.get('field01').value='xxx';
							//self.model = dojox.mvc.getStateful(model);
							self.model.set('field01', new dojo.Stateful({value: "Bar"}));
							self.model.set('field01', dojox.mvc.getStateful({value: "Bar"}));
							//self.ctrl.set("model", model);
							//parse.parse();
							//self.set('model', coWidgetOpts.model);
							//self.postMixInProperties();
							//new CoWidget(coWidgetOpts).placeAt();
							
							//self.startup();
							
							//self.ctrl.set('field01', new dojo.Stateful({value: "Bar"}));
							//self.ctrl.set('field01', dojox.mvc.getStateful({value: "Bar"}));
							//self.buildRendering();
							parser.parse();
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
			
			parser.parse();
		},
		
		none : null

	});
	
	console.debug('[DojoWidget] return.');
	return DojoWidget;
});

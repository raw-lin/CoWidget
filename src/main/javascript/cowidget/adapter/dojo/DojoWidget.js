define([ "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/dom-style", "dojo/_base/fx",
		"dojo/_base/lang", "dojo/on", "dojo/mouse", "require", 'dojo/string', 'dijit/_WidgetsInTemplateMixin' // context-sensitive
		// require to
		// get URLs to
		// resources
		// from relative
		// paths
], function(declare, _WidgetBase, _TemplatedMixin, domStyle, baseFx, lang, on, mouse, require, string) {
	'use strict';

	var DojoWidget = declare("cowidget.Widget", [_WidgetBase, _TemplatedMixin], {
		
		postCreate : function() {
			let self = this;
			// Get a DOM node reference for the root of our widget
			var domNode = self.domNode;

			console.log('[DojoWidget.postCreate] self: ', self);
			console.log('[DojoWidget.postCreate] model: ', self.model);
			console.log('[DojoWidget.postCreate] templatePath: ', self.templatePath);

			console.log('[DojoWidget.postCreate] dojo.query: ', dojo.query('button[type="reset"]', domNode));
			let buttons = dojo.query('button[type="reset"]', domNode).on("click", function() {
				alert('reset');
				console.log('[DojoWidget.postCreate] self: ', self);
				// ajax submit
			});

			dojo.query('[type="submit"]', domNode).on("click", function(evt) {
				dojo.stopEvent(evt);
				console.log('[DojoWidget.postCreate] button: ', this);
				console.log('[DojoWidget.postCreate] self: ', self);
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
					form : dojo.query('form', self.dom)[0],
					handleAs : 'json',
					load : function(data) {
						console.log('[DojoWidget.postCreate] xhrArgs data: ', data);
						
						// mock
						let coWidgetOpts = data[buttonName][0];
						console.log('[DojoWidget.postCreate] coWidgetOpts: ', coWidgetOpts);
						new CoWidget(coWidgetOpts).placeAt();
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
				var deferred = dojo.xhrPost(xhrArgs);
			});
		},
		
		none : null

	});

	return DojoWidget;
});

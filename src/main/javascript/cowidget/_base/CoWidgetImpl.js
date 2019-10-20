/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class CoWidgetImpl {
	static isWork(){
		console.debug('[CoWidgetImpl.isWork] success');
		return true;
    };
    
    static _init(userConfig, defaultConfig) {
        console.debug('[CoWidgetImpl._init] call');
    };

    static ready(priority, context, callback) {
        return cowidget.common.Util.ready(priority, context, callback);
    };

    static load(url) {
    	console.debug('[CoWidgetImpl.load] url: ', url);
        var retCoWidget = null;

        var xhrOptions = {
            url: url,
            handleAs: 'json',

            preventCache: false,
            sync: false,

            load: (data) => {
                console.debug('[CoWidgetImpl.load] data: ', data);

                if (Array.isArray(data)) {
                    retCoWidget = new CoWidget();
                    data.forEach((item, index, array) => {
                        console.debug('[CoWidgetImpl.load xhrArgs.load] item: ' + index + ', ', item);
                        // if (0 == index) {
                        retCoWidget.push(new CoWidget(item));
                        // };
                    });
                } else {
                    retCoWidget = new CoWidget(data);
                }

                console.debug('[CoWidgetImpl.load xhrArgs.load] retCoWidget ', retCoWidget);
            },

            error: (error) => {
                console.error('[CoWidgetImpl.load xhrArgs.error] error ', error);
            }
        };

        try {
            // Call the asynchronous xhr
            cowidget.common.NetXhr.xhr(xhrOptions);
        } catch (exception) {
            console.error('[CoWidgetImpl.load] exception: ', exception);
        } finally {
            return retCoWidget;
        }
    };
    
    /**
	 * TODO
	 */
    static query() {
    	// return dojo.query(id, doc);
    	return document.getElementById(id);
    }
    
    /**
	 * TODO
	 */
    static byId(id, doc) {
    	// return dojo.byId(id, doc);
    	console.debug('[Dom.byId] cowidget.common.ClassLoader.container.document: ', cowidget.common.ClassLoader.container.document);
    	return cowidget.common.Dom.byId(id, doc);
    };
    
    static create(){
    	
    };

    constructor(option) {
        var self = this;
        option = option ? option : {};

        console.debug('[CoWidgetImpl.constructor] self: ', self);
        console.debug('[CoWidgetImpl.constructor] option: ', option);;
        
        // self.adapter = new Objecy();
        self.metaData = option ? option : {};
        self.metaData.uiType = CoWidget.configure.ui;
        self.omponents = [];
        self.widget = null;
        
        self.model = option.model ? option.model:{};
        self.place = option.place ? option.place : 'coWidget';
        let cowidgetViewName = self.metaData.viewName ? self.metaData.viewName : '';

        if ('' !== cowidgetViewName && 'dojo' === self.metaData.uiType) {
            console.debug('[CoWidgetImpl.constructor] dojo cowidgetViewName: ' + self.metaData.ui + ',', cowidgetViewName);
            require([cowidgetViewName, 'dojo/Stateful'], (DojoWidget, Stateful) => {
                console.debug('[CoWidgetImpl.constructor] DojoWidget: ', DojoWidget);

                if (true /* dojo */ ) {
                    // success
                	// require('dojo.Stateful');
                    self.widget = new DojoWidget({
                        model: new dojo.Stateful(self.model),
                        model2: {
                        	field01 : '1',
                        	field02 : '2'
                        }
                    });

                    console.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
                    self.widget.postCreateAfter(self.model);
                }
            });
        }else if ('' !== cowidgetViewName && 'ui5' === self.metaData.uiType) {
            console.debug('[CoWidgetImpl.constructor] cowidgetViewName: ' + self.metaData.ui + ',', cowidgetViewName);
        	self.widget = sap.ui.xmlview({
                viewName : "mock.ui5.view.Logon"
             });

			console.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
			sap.ui.require("sap/ui/model/json/JSONModel");
			let oModel = new sap.ui.model.json.JSONModel({
				field01: "[CoWidgetImpl.constructor] Hi, my name is Harry Hawk"
			});
			self.widget.setModel(oModel);
        }
    };

    getMetaData() {
        var self = this;
        return self.metaData;
    };

    push(coWidget) {
        var self = this;

        console.debug('[CoWidgetImpl.push] coWidget: ', coWidget);
        
        self.omponents.push(coWidget);
    };

    placeAt(place) {
        var self = this;
        console.debug('[CoWidgetImpl.placeAt] self: ', self);
        
//	        () => {
//	        	if (self.omponents.length > 0) {
//	        		place = 'coWidget';
//	        		self.omponents.forEach(function(element) {
//	        			console.debug('[CoWidgetImpl.placeAt] element: ', element);
//	        			element.placeAt();
//	        		});
//	        	}else {
//	                place = place ? place : self.place;
//	                if (0 === place.indexOf('#')) {
//	                	place = place.replace('#', '');
//	                }
//	                console.debug('[CoWidgetImpl.placeAt] place: ' + place);
//	                // self.widget.buildRendering();
//	                place = 'cowidget';
//	                self.widget.placeAt(place, 'only');
//	        	}
//	        }
	        
        if ('dojo' === self.metaData.uiType) {
        	dojo.ready(0, () => {
            	
            	if (self.omponents.length > 0) {
            		place = 'coWidget';
            		self.omponents.forEach(function(element) {
            			console.debug('[CoWidgetImpl.placeAt] element: ', element);
            			element.placeAt();
            		});
            	}else {
                    place = place ? place : self.place;
                    if (0 === place.indexOf('#')) {
                    	place = place.replace('#', '');
                    }
                    console.debug('[CoWidgetImpl.placeAt] place: ' + place);
                    // self.widget.buildRendering();
                    place = 'coWidget';
                    self.widget.placeAt(place, 'only');
            	}
                // plugin ajax method
            });
        }else {
        	// ui5
        	if (self.omponents.length > 0) {
        		place = 'coWidget';
        		self.omponents.forEach(function(element) {
        			console.debug('[CoWidgetImpl.placeAt] element: ', element);
        			element.placeAt();
        		});
        	}else {
                place = place ? place : self.place;
                if (0 === place.indexOf('#')) {
                	place = place.replace('#', '');
                }
                console.debug('[CoWidgetImpl.placeAt] place: ' + place);
                // self.widget.buildRendering();
                place = 'cowidget';
                self.widget.placeAt(place, 'only');
        	}
        }
        
        return self;
    };
}

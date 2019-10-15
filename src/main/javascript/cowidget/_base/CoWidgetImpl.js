/*
 * CoWidget
 * 
 * (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 */
/*
 * This is an optimized version of CoWidget, built for deployment and not for development. To get sources and documentation, please visit: http://cow.rawya.net
 */
'use strict';
(function() {
    console.debug('[CoWidgetImpl] return CoWidgetImpl class');
    return class CoWidgetImpl {
    	static test(){
    		console.debug('[CoWidgetImpl.test] success');
    		return 'success';
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
            console.debug('[CoWidgetImpl.load] ui: dojo');

            var xhrOptions = {
                url: url,
                handleAs: 'json',

                preventCache: false,
                sync: false,

                load: function(data) {
                    console.debug('[CoWidgetImpl.load] data: ', data);

                    if (Array.isArray(data)) {
                        retCoWidget = new CoWidget();
                        data.forEach(function(item, index, array) {
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

                error: function(error) {
                    console.error('[CoWidgetImpl.load xhrArgs.error] error ', error);
                }
            };

            try {
                // Call the asynchronous xhr
                cowidget.common.Net.xhr(xhrOptions);
            } catch (exception) {
                console.error('[CoWidgetImpl.load] exception: ', exception);
            } finally {
                return retCoWidget;
            }
        };
        
        static query() {
        	return dojo.query(id, doc);
        }
        
        static byId(id, doc) {
        	return dojo.byId(id, doc);
        };
        
        static create(){
        	
        };

        constructor(option) {
            var self = this;
            option = option ? option : {};

            console.debug('[CoWidgetImpl.constructor] self: ', self);
            console.debug('[CoWidgetImpl.constructor] option: ', option);

            // self.adapter = new Objecy();
            self.metaData = option ? option : {};
            self.metaData = option ? option : {};
            self.metaData.ui = 'dojo';
            self.omponents = [];  
            self.widget = null;
            self.model = {
               
            };
            
            self.model = option.model ? option.model:{};
            self.place = option.place ? option.place : 'coWidget';
            var cowidgetViewName = self.metaData.viewName ? self.metaData.viewName : '';

            // Object.defineProperty(self, 'model', {
            // message : 'xxxx'
            // });

            if ('' !== cowidgetViewName && 'dojo' === self.metaData.ui) {
                console.debug('[CoWidgetImpl.constructor] cowidgetViewName: ', cowidgetViewName);
                require([cowidgetViewName], function(dojoWidget) {
                    console.debug('[CoWidgetImpl.constructor] dojoWidget: ', dojoWidget);

                    if (true /* dojo */ ) {
                        // success
                        self.widget = new dojoWidget({
                            model: self.model
                        });
                        console.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
                    }
                });
            }
        };

        getMetaData() {
            var self = this;
            return self.metaData;
        };

        push(coWidget) {
            var self = this;

            console.debug('[CoWidget.add] coWidget: ', coWidget);
            
            self.omponents.push(coWidget);
        };

        placeAt(place) {
            var self = this;
            dojo.ready(0, function() {
            	
            	if (self.omponents.length > 0) {
            		place = 'coWidget';
            		self.omponents.forEach(function(element) {
            			console.debug('[CoWidget.placeAt] element: ', element);
            			element.placeAt();
            		});
            	}else {
	                place = place ? place : self.place;
	                if (0 === place.indexOf('#')) {
	                	place = place.replace('#', '');
	                }
	                console.debug('[CoWidget.placeAt] place: ' + place);
	                // self.widget.buildRendering();
	                self.widget.placeAt(place, 'only');
            	}
                // plugin ajax method
            });
            
            return self;
        };
    };
    
})();

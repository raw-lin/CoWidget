/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */
class CoWidgetImpl {
	static get LOG() {
		return cowidget.common.LogFactory.getLog(this);
	}
	
	static isWork(){
		CoWidgetImpl.LOG.debug('[CoWidgetImpl.isWork] success');
		return true;
    };
    
    static _init(userConfig, defaultConfig) {
        CoWidgetImpl.LOG.debug('[CoWidgetImpl._init] call');
    };

    static ready(priority, context, callback) {
        return cowidget.common.Util.ready(priority, context, callback);
    };

    static load(url) {
    	CoWidgetImpl.LOG.debug('[CoWidgetImpl.load] url: ', url);
    	
        var retCoWidget = null;

        var xhrOptions = {
            url: url,
            handleAs: 'json',

            preventCache: false,
            sync: false,

            load: (data) => {
                CoWidgetImpl.LOG.debug('[CoWidgetImpl.load] data: ', data);

                if (Array.isArray(data)) {
                    retCoWidget = new CoWidget();
                    data.forEach((item, index, array) => {
                        CoWidgetImpl.LOG.debug('[CoWidgetImpl.load xhrArgs.load] item: ' + index + ', ', item);
                        // if (0 == index) {
                        retCoWidget.push(new CoWidget(item));
                        // };
                    });
                } else {
                    retCoWidget = new CoWidget(data);
                }

                CoWidgetImpl.LOG.debug('[CoWidgetImpl.load xhrArgs.load] retCoWidget ', retCoWidget);
            },

            error: (error) => {
                CoWidgetImpl.LOG.error('[CoWidgetImpl.load xhrArgs.error] error ', error);
            }
        };

        try {
            // Call the asynchronous xhr
            cowidget.common.NetXhr.xhr(xhrOptions);
        } catch (exception) {
            CoWidgetImpl.LOG.error('[CoWidgetImpl.load] exception: ', exception);
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
    	//CoWidgetImpl.LOG.debug('[DomUtil.byId] cowidget.lang.ClassLoader.container.document: ', cowidget.lang.ClassLoader.container.document);
    	return cowidget.common.DomUtil.byId(id, doc);
    };
    
    static create(){
    	
    };
    
    constructor(option) {
        let self = this;
        option = option ? option : {};
        
        // initial parameter
        self.metaData = option ? option : {};
        self.metaData.uiType = CoWidget.configure.ui;
        self.omponents = [];
        self.widget = null;
        
        self._init(option);
    }
	
	_init(option) {
        let self = this;
        
		let cowidgetViewName = self.metaData.viewName ? self.metaData.viewName : '';
        
        CoWidgetImpl.LOG.debug('[_init] uiType cowidgetViewName: ' + self.metaData.uiType + ', ', cowidgetViewName);
        if (cowidget.common.StringUtil.isNotEmpty(cowidgetViewName) && 'dojo' === self.metaData.uiType) {
            //dojo.require('dojo/_base/declare');
            //dojo.require(cowidgetViewName);
            
            CoWidgetImpl.LOG.debug('[_init] cowidgetViewName: ', cowidgetViewName);
            
            let cowidgetViewNameUrl = cowidget.common.StringUtil.replaceAll(cowidgetViewName, '.', '/');
            cowidgetViewNameUrl = cowidgetViewName;
            CoWidgetImpl.LOG.debug('[_init] cowidgetViewNameUrl: ' + cowidgetViewNameUrl);
            
            require([cowidgetViewNameUrl, 'dojo/ready'], function (AdapterDojoWidget, ready) { // don't use dojo.require
            	CoWidgetImpl.LOG.debug('[_init] AdapterDojoWidget: ', AdapterDojoWidget);
            	
            	self.widget = new AdapterDojoWidget({
            		baseHref: cowidget.common.UrlUtil.getBaseHref(),
		            none: null
		        });
            	
            	//CoWidgetImpl.LOG.debug('[_init] self.widget: ', self.widget);
            	
            	ready(() => {
            		CoWidgetImpl.LOG.debug('[_init] call ready');
            		//self.widget.placeAt('coWidget');
            	});
            });
        }
	}

    constructorX(option) {
        var self = this;
        option = option ? option : {};

        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self: ', self);
        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] option: ', option);;
        
        // self.adapter = new Objecy();
        self.metaData = option ? option : {};
        self.metaData.uiType = CoWidget.configure.ui;
        self.omponents = [];
        self.widget = null;
        
        //self.model = option.model ? option.model:{};
        self.place = option.place ? option.place : 'coWidget';
        var cowidgetViewName = self.metaData.viewName ? self.metaData.viewName : '';
        
        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] uiType cowidgetViewName: ' + self.metaData.uiType + ', ', cowidgetViewName);
        if (cowidget.common.StringUtil.isNotEmpty(cowidgetViewName) && 'dojo' === self.metaData.uiType) {
            //dojo.require('dojo/_base/declare');
            //dojo.require(cowidgetViewName);
            
            CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] cowidgetViewName: ', cowidgetViewName);
            
            let cowidgetViewNameUrl = cowidget.common.StringUtil.replaceAll(cowidgetViewName, '.', '/');
            cowidgetViewNameUrl = cowidgetViewName;
            CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] cowidgetViewNameUrl: ' + cowidgetViewNameUrl);
            dojo.require(cowidgetViewNameUrl);
            
            dojo.require([cowidgetViewNameUrl, "dojo/domReady!"], (AdapterDojoWidget) => {
            	CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] AdapterDojoWidget: ', AdapterDojoWidget);
            	
            	self.widget = AdapterDojoWidget;
            	self.widget['baseHref'] = cowidget.common.UrlUtil.getBaseHref();

            	CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
            });
            	
//            require([cowidgetViewName], (DojoWidget) => {
//                CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] DojoWidget: ', DojoWidget);
// 
//                if (true /* dojo */ ) {
//                    // success
//                	//dojo.require('dojo.Stateful');
//                	//dojo.require('dojox/mvc/ModelRefController');
//                	self.widget = DojoWidget;
////                    self.widget = new DojoWidget({
////                    	modelDate: {
////                        	field01 : {
////                        		value: 'modelDate CoWidgetImpl 1'
////                        		},
////                        	field02 : {
////                        		value: 'modelDate CoWidgetImpl 2'
////                        	}},
////                    	modelDate1: {
////                        	field01 : 'model1 CoWidgetImpl 1',
////                        	field02 : 'model1 CoWidgetImpl 2'
////                        },
////                        
//////                        model: dojox.mvc.getStateful({
//////                        	field01 : {
//////                        		value: 'model3 CoWidgetImpl 1'
//////                        		},
//////                        	field02 : {
//////                        		value: 'model3 CoWidgetImpl 2'
//////                        	}}),
////                        	
//////                    	model4: dojox.mvc.getStateful({ model : {
//////                        	field01 : {
//////                        		value: 'model4 CoWidgetImpl 1'
//////                        		},
//////                        	field02 : {
//////                        		value: 'model4 CoWidgetImpl 2'
//////                        	}}}),
////                        	
////                        none: null
////                    });
//
//                    CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
//                    //self.widget.postCreateAfter(self.model);
//                }
//            });
        }else if ('' !== cowidgetViewName && 'ui5' === self.metaData.uiType) {
            CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] cowidgetViewName: ' + self.metaData.ui + ',', cowidgetViewName);
        	self.widget = sap.ui.xmlview({
                viewName : "mock.ui5.view.Logon"
             });

			CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
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

        CoWidgetImpl.LOG.debug('[CoWidgetImpl.push] coWidget: ', coWidget);
        
        self.omponents.push(coWidget);
    };

    placeAt(place) {
        var self = this;
        CoWidgetImpl.LOG.debug('[CoWidgetImpl.placeAt] self: ', self);
        
//	        () => {
//	        	if (self.omponents.length > 0) {
//	        		place = 'coWidget';
//	        		self.omponents.forEach(function(element) {
//	        			CoWidgetImpl.LOG.debug('[CoWidgetImpl.placeAt] element: ', element);
//	        			element.placeAt();
//	        		});
//	        	}else {
//	                place = place ? place : self.place;
//	                if (0 === place.indexOf('#')) {
//	                	place = place.replace('#', '');
//	                }
//	                CoWidgetImpl.LOG.debug('[CoWidgetImpl.placeAt] place: ' + place);
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
            			CoWidgetImpl.LOG.debug('[CoWidgetImpl.placeAt] element: ', element);
            			element.placeAt();
            		});
            	}else {
                    place = place ? place : self.place;
                    if (0 === place.indexOf('#')) {
                    	place = place.replace('#', '');
                    }
                    CoWidgetImpl.LOG.debug('[CoWidgetImpl.placeAt] place: ' + place);
                    // self.widget.buildRendering();
                    place = 'coWidget';

        			if(true || self.widget && self.widget.domNode) {
        				self.widget['placeReference'] = place;
        				self.widget['placePosition'] = 'only';
        				
        				self.widget.placeAt(self.widget.placeReference, self.widget.placePosition);
        			}else{
        				CoWidgetImpl.LOG.error('[CoWidgetImpl.placeAt] self.widget is not ready');
        				CoWidgetImpl.LOG.error('[CoWidgetImpl.placeAt] self.widget: ', self.widget);
        			}
            	}
                // plugin ajax method
           });
        }else {
        	// ui5
        	if (self.omponents.length > 0) {
        		place = 'coWidget';
        		self.omponents.forEach(function(element) {
        			CoWidgetImpl.LOG.debug('[CoWidgetImpl.placeAt] element: ', element);
        			element.placeAt();
        		});
        	}else {
                place = place ? place : self.place;
                if (0 === place.indexOf('#')) {
                	place = place.replace('#', '');
                }
                CoWidgetImpl.LOG.debug('[CoWidgetImpl.placeAt] place: ' + place);
                // self.widget.buildRendering();
                place = 'cowidget';
                self.widget.placeAt(place, 'only');
        	}
        }
        
        return self;
    };
}

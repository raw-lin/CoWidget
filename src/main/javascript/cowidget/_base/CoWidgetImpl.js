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
    
    static create(option){
    	let retCoWidget = null;
    	
    	retCoWidget = new CoWidgetImpl(option);
    	
    	return retCoWidget;
    };
    
    constructor(option) {
        let self = this;
        option = option ? option : {};
        
        // initial parameter
        self.metaData = option ? option : {};
        self.metaData.uiType = CoWidget.configure.ui;
        self.components = [];
        self.widget = null;
    }
	
    _placeAt4Dojo(place, position) {
        let self = this;
        
        self['placeReference'] = place;
		self['placePosition'] = position ? position:'only';
        
        let cowidgetViewName = self.metaData.viewName ? self.metaData.viewName : '';
        
		CoWidgetImpl.LOG.debug('[_placeAt4Dojo] self: ', self);
		CoWidgetImpl.LOG.debug('[_placeAt4Dojo] uiType cowidgetViewName: ' + self.metaData.uiType + ', ', cowidgetViewName);
        if (cowidget.common.StringUtil.isNotEmpty(cowidgetViewName) && 'dojo' === self.metaData.uiType) {
            //dojo.require('dojo/_base/declare');
            //dojo.require(cowidgetViewName);
            
            let cowidgetViewNameUrl = cowidget.common.StringUtil.replaceAll(cowidgetViewName, '.', '/');
            cowidgetViewNameUrl = cowidgetViewName;
            CoWidgetImpl.LOG.debug('[_placeAt4Dojo] cowidgetViewNameUrl: ' + cowidgetViewNameUrl);
            
            let coWidget = self;
            require([cowidgetViewNameUrl, 'dojo/ready'], function (DojoWidgetAdapter, ready) { // don't use dojo.require
            	CoWidgetImpl.LOG.debug('[_placeAt4Dojo] DojoWidgetAdapter begin');
            	coWidget.widget = new DojoWidgetAdapter({
            		baseHref: cowidget.common.UrlUtil.getBaseHref(),
		            none: null
		        });
            	
            	dojo.ready(0, () => {
            		CoWidgetImpl.LOG.debug('[_placeAt4Dojo] call ready');
            		coWidget.widget.placeAt(self.placeReference, self.placePosition);
            	});
            	
            	CoWidgetImpl.LOG.debug('[_placeAt4Dojo] DojoWidgetAdapter end: ', self.widget);
            });
        }
        
        return self;
	}

    getMetaData() {
        var self = this;
        return self.metaData;
    };

    push(coWidget) {
        var self = this;

        CoWidgetImpl.LOG.debug('[CoWidgetImpl.push] coWidget: ', coWidget);
        
        self.components.push(coWidget);
    };

    placeAt(place, position) {
    	position = position ? position:'only';
        var self = this;
        
        self['placeReference'] = place;
		self['placePosition'] = position;
        
        if ('dojo' === self.metaData.uiType) {
        	self._placeAt4Dojo(place, position);
        	dojo.ready(0, () => {
            	
        	});
        }else {
        	// ui5
        	if (self.components.length > 0) {
        		place = 'coWidget';
        		self.components.forEach(function(element) {
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
    
    /* Skip */

    constructorX(option) {
        var self = this;
        option = option ? option : {};

        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self: ', self);
        CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] option: ', option);;
        
        // self.adapter = new Objecy();
        self.metaData = option ? option : {};
        self.metaData.uiType = CoWidget.configure.ui;
        self.components = [];
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
            
            dojo.require([cowidgetViewNameUrl, "dojo/domReady!"], (DojoWidgetAdapter) => {
            	CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] DojoWidgetAdapter: ', DojoWidgetAdapter);
            	
            	self.widget = DojoWidgetAdapter;
            	self.widget['baseHref'] = cowidget.common.UrlUtil.getBaseHref();

            	CoWidgetImpl.LOG.debug('[CoWidgetImpl.constructor] self.widget: ', self.widget);
            });
            	
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
}

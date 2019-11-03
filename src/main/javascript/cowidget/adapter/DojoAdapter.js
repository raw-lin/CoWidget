/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */

class DojoAdapter extends CoWidget {
	static get LOG() {
		return cowidget.common.LogFactory.getLog(DojoAdapter);
	}
	
	constructor(option) {
		super(option);
        let self = this;
	}
	
	_placeAt(place, position) {
        let self = this;
        
        self['placeReference'] = place;
		self['placePosition'] = position ? position:'only';
        
        let cowidgetViewName = self.metaData.viewName ? self.metaData.viewName : '';
        
		DojoAdapter.LOG.debug('[_placeAt] self: ', self);
		DojoAdapter.LOG.debug('[_placeAt] uiType cowidgetViewName: ' + self.metaData.uiType + ', ', cowidgetViewName);
		DojoAdapter.LOG.debug('[_placeAt] viewModel: ', self.metaData.viewModel);
        if (cowidget.common.StringUtil.isNotEmpty(cowidgetViewName) && 'dojo' === self.metaData.uiType) {
            //dojo.require('dojo/_base/declare');
            //dojo.require(cowidgetViewName);
            
            let cowidgetViewNameUrl = cowidget.common.StringUtil.replaceAll(cowidgetViewName, '.', '/');
            cowidgetViewNameUrl = cowidgetViewName;
            DojoAdapter.LOG.debug('[_placeAt] cowidgetViewNameUrl: ' + cowidgetViewNameUrl);
            
            let coWidget = self;
            dojo.ready(0, () => {
            	 require([cowidgetViewNameUrl, 'dojo/ready', 'dojo/domReady!'], function (DojoWidgetController, ready) { // don't use dojo.require
 	            	DojoAdapter.LOG.debug(`[_placeAt] DojoWidgetAdapter begin:`);
 	            	coWidget.widget = new DojoWidgetController({
 	            		baseHref: cowidget.common.UrlUtil.getBaseHref(),
 	            		viewModel: self.metaData.viewModel ? self.metaData.viewModel:{},
 			            none: null
 			        });
 	            	
 	            	DojoAdapter.LOG.debug('[_placeAt] coWidget.widget: ', coWidget.widget);
 	            	
 	            	dojo.ready(0, () => {
 	            		DojoAdapter.LOG.debug('[_placeAt] call ready');
 	            		coWidget.widget.placeAt(self.placeReference, self.placePosition);
 	            	});
 	            	
 	            	DojoAdapter.LOG.debug(`[_placeAt] DojoWidgetAdapter end: `, self.widget);
 	            });
            });
	           
        }
	}
}
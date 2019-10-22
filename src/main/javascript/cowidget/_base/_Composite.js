/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */
class Composite {
	static get LOG() {
		return cowidget.common.LogFactory.getLog(this);
	}
	
	get LOG() {
		return this.constructor.LOG;
	}
	
	constructor(options) {
		options = options ? options:{name:'Composite'};
		this.name = options.name;
	}
	
	placeAt() {
		let that = this;

		if(Array.isArray(that.composites)) {
			that.composites.forEach(function(element) {
				that.LOG.debug('[cowidget._base._Composite.placeAt] element: ', element);
			});
		}else {
			that.LOG.debug('[cowidget._base._Composite.placeAt] this: ', that);
		}
	}
	
	add(/* Composite */ child) {
		let that = this;
		if('undefined' == typeof that.composites) {
			that.composites = [];
			
			that.composites.push(that);
		}
		that.composites.push(child);
	}
}
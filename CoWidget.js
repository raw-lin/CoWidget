/**
 * CoWidget
 * 
 * (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 */
/*
 * This is an optimized version of CoWidget, built for deployment and not for development. To get sources and documentation, please visit: http://cow.rawya.net
 */
'use strict';
(function(global, factory) {
    if (false) {
        // TODO Error: multipleDefine for define
        typeof exports === 'object' && typeof module !== 'undefined' ?
            module.exports = factory() : typeof define === 'function' && define.amd ?
            define(factory) : (global.CoWidget = factory(global, coWidgetConfig));
    } else if (false) {} else {
        var coWidgetConfig = global.coWidgetConfig ? global.coWidgetConfig : {};
        global.CoWidget = global.CoWidget ? global.CoWidget : factory(global, coWidgetConfig);

        console.debug('[boot] global.CoWidget: ', global.CoWidget ? 'success' : 'failure');
    }
}(this, (function(container, userConfig) {
    'use strict';

    console.debug('[factory] container: ', container);
    console.debug('[factory] userConfig: ', userConfig);

    var emptyObject = {};

    {
        Object.freeze(emptyObject);
    }

    var currentBaseHref = (function(doc) {
        var currentScript = doc.currentScript ? doc.currentScript : (function(doc) {
            var jsScripts = doc.scripts;
            return jsScripts[jsScripts.length - 1];
        })(doc);

        console.debug('[CoWidget.factory.currentBaseHref] console: ', console);
        console.debug('[CoWidget.factory.currentBaseHref] console.method: ', console.table());
        console.debug('[CoWidget.factory.currentBaseHref] currentScript: ', currentScript);

        var currentHref = currentScript && currentScript.src ? currentScript.src : './';

        console.debug('[CoWidget.factory.currentBaseHref] currentHref: ', currentHref);
        var currentBaseHref = currentHref ? currentHref.replace('/cowidget/CoWidget.js', '') : './';
        console.debug('[CoWidget.factory.currentBaseHref] currentBaseHref: ', currentBaseHref);

        return currentBaseHref;

    })(container.document);

    {
    	class ClassLoader {
// static get log() {
// return LogFactory.getLog(ClassLoader);
// }
    	    
    	    constructor(options) {
    	    	console.error('[ClassLoader.constructor] not work');
            }
    	    
    	    static getSystemClassLoader() {
    	    	let self = this;
    	    	
    	    	return self;
    	    }
    	    
    	    static findClass(className) {
    	    	let self = this;
    	    	let classObj = null;
    	    	console.debug('[ClassLoader.findClass] className: ' + className);
    	    	
    	    	if('cowidget.lang.ClassLoader' === className) {
    	    		classObj = self;
    	    	}else {
    	    		let targetUrl = ClassLoader.baseHref + '/' + className.replace(/\./gi, '/') + '.js';
        	    	console.debug('[ClassLoader.proxyHandler.findClass] targetUrl: ' + targetUrl);
        	    	
        	    	var xhrOptions = {
        	    			url: targetUrl,
        	    			method: 'GET',
                            sync: true,
                            handleAs: 'script',

// load: function(response) {
// console.debug('[xhr.onLoad] xhrOptions: ', xhrOptions);
// console.debug('[xhr.onLoad] xhr: ', xhr);
// if (200 === xhr.status) {
// // console.debug('[xhr.onLoad] e: ', e);
// var arraybuffer = xhr.response; // not responseText
// // console.debug('arraybuffer: ', arraybuffer);
    //
// try {
// scriptObj = eval(arraybuffer);
// // console.debug('[xhr.onLoad] scriptObj: ', scriptObj);
// } catch (exception) {
// console.error('[xhr.onLoad] scriptObj: ', scriptObj);
// console.error('[xhr.onLoad] exception: ', exception);
// console.trace('[xhr.onLoad]');
// scriptObj = null;
// }
// } else {
// console.error('[xhr.onLoad] xhr.status: ', xhr.status);
// console.error('[xhr.onLoad] xhr.statusText: ', xhr.statusText);
// console.error('[xhr.onLoad] xhr.response: ', xhr.response);
// scriptObj = null;
// }
// }
                            none : null
                        };
        	    	
        	    	classObj = ClassLoader.xhr(xhrOptions);
    	    	}
    	    	
    	    	return classObj;
    	    }
    	    
    		static xhr(xhrOptions) {
    			xhrOptions = xhrOptions ? xhrOptions:{};
    	    	var retObj = null;
    	    	
    	    	let xhr = new XMLHttpRequest();
    	    	xhr.open(xhrOptions.method, xhrOptions.url, false);
    	    	
    	    	xhr.onload = function(e) {
	    	    	if(xhrOptions.load) {
	    	    		if ('json' === xhrOptions.handleAs) {
	    	    			retObj = JSON.parse(xhr.response);
	    	    			xhrOptions.load(retObj); // not responseText
	    	    		}else {
	    	    			xhrOptions.load(xhr.response);
	    	    		}
	    	    	}else if ('script' === xhrOptions.handleAs) {
	    	    		retObj = ClassLoader.eval(xhr.response);
	    	    	}else if ('json' === xhrOptions.handleAs) {
	    	    		retObj = JSON.parse(xhr.response);
    	    	    }else {
	    	    		retObj = xhr.responseText;
	    	    	}
	    	    }
    	    	
	    	    xhr.onerror = function(e) {
	    	    	retObj = null;
	    	    }

                xhr.send(null);
                
                return retObj;
    	    }

    	    static xhr1(xhrOptions) {
    	    	var retObj = null;
    	    	
    	    	let promise = new Promise(function(resolve, reject) {
    	    	    let xhr = new XMLHttpRequest();
    	    	    xhr.open(xhrOptions.method, xhrOptions.url, false);
                    
    	    	    xhr.onload = function(e) {
    	    	    	resolve(xhr.responseText);
    	    	    }
    	    	    xhr.onerror = function(e) {
    	    	    	reject(xhr.statusText);
    	    	    }

                    xhr.send(null);
    	    	});
    	        
    	    	promise.then(function(value) {
    	            console.debug('[ClassLoader.xhr.promise.then] ', value);
    	            retObj = ClassLoader.eval(value);
    	        }).catch(function(error) {
    	        	retObj = null;
    	            console.error(error);
    	        });
    	    	
    	    	return retObj;
    	    }

    	    /*
			 * evaluates JavaScript code
			 */
    	    static eval(functionBody) {
    	    	let retObj = null;
    	        // functionBody = 'console.debug("[top] ClassLoader: ", ClassLoader.container); return class { constructor(options) { this.options = options ? options:{}; console.debug("[constructor] caller: ", this.caller); console.debug("[constructor] options: ", options ? options:{}); console.debug("[constructor] new Class"); } };';

    	        // functionBody = 'return ' + '(function(ClassLoader) { ' + functionBody + ' })(ClassLoader);';
    	        
// functionBody = 'return (function() {' + functionBody + '})()';
// try {
// retObj = Function('ClassLoader', functionBody)(ClassLoader);
// //retObj = Function(functionBody)();
// } catch (exception) {
// retObj = null;
//        	    	 
// console.error('functionBody: ', functionBody);
// console.error('exception: ', exception);
// }
    	        
    	    	try {
    	    		retObj = eval(functionBody);
        	    } catch (exception) {
        	    	retObj = null;
        	    	 
    	            console.error('[ClassLoader.eval] functionBody: ', functionBody);
    	            console.error('[ClassLoader.eval] exception: ', exception);
    	        }
        	    
        	    console.debug('[ClassLoader.eval] retObj: ', retObj);
        	    
    	        return retObj;
    	    }
    	    
    	    static getProxyHandler() {
    	    	let self = this;
    	    	
    	        return {    	        	
    	            'get': function(obj, prop, receiver) {obj, prop
    	            	if ('undefined' === typeof obj[prop]) {
        	                console.debug('[ClassLoader.proxyHandler.get] obj: ' + (typeof obj), obj);
        	                console.debug('[ClassLoader.proxyHandler.get] prop: ' + (typeof prop), prop);
        	                console.debug('[ClassLoader.proxyHandler.get] prop.toString: ' + prop.toString());
    	            	}

// console.debug('[ClassLoader.proxyHandler] obj[\'Symbol(Symbol.toPrimitive)\']: ' + (typeof obj['Symbol(Symbol.toPrimitive)']));
// console.debug('[ClassLoader.proxyHandler] obj[\'Symbol\']: ' + (typeof obj['Symbol']));
// console.debug('[ClassLoader.proxyHandler] obj[\'Symbol.toPrimitive\']: ' + (typeof obj['Symbol.toPrimitive']));
// console.debug('[ClassLoader.proxyHandler] obj[\'toPrimitive\']: ' + (typeof obj['toPrimitive']));

    	                if ('symbol' === typeof prop) {
    	                    console.debug('[ClassLoader.proxyHandler.get] obj instanceof Symbol');
    	                    return function(hint) {
    	                        console.debug('[ClassLoader.proxyHandler.get] obj instanceof Symbol: ', obj.prop);
    	                        //return obj.toString();
    	                        return obj.prop;
    	                    };
    	                } else if (typeof obj[prop] === 'undefined') {
    	                	if (prop.match(/[\-]{0,1}[A-Z]{1,1}/)) {
                                // match naming Class
                                obj[prop] = ClassLoader.findClass(obj.packageName + '.' + prop);
                                
                                if(obj[prop]) {
                                	 // Object.assign(obj[prop], {
                                     // packageName: obj.packageName,
                                     // className: prop
                                     // });
                                }
                            } else {
                                // match naming Package
                                let packageObj = ClassLoader.findClass(obj.packageName + '.' + prop + '.package');

                                if (packageObj) {
                                    Object.assign(packageObj, {
                                        'packageName': obj.packageName + '.' + prop
                                    });
                                } else {
                                    packageObj = {
                                        packageName: obj.packageName + '.' + prop
                                    };

                                }
                                obj[prop] = new Proxy(packageObj, ClassLoader.getProxyHandler());
                            }
    	                }
    	                
    	                return obj[prop];
    	            },

    	            none: null
    	        }
    	    }
    	}
    	
    	Object.assign(ClassLoader, {
        	baseHref: currentBaseHref,
        	container : container
         });
    	//console.debug('[CoWidget.factory] ClassLoader: ', ClassLoader);

    	// let classLoader = new ClassLoader();
        // package lazy loading
        container.cowidget = container.cowidget ? container.cowidget : new Proxy({
            packageName: 'cowidget',
        }, ClassLoader.getProxyHandler());
    	
    	// plugin ClassLoader to cowidget.lang
        console.debug('[CoWidget.factory] cowidget.lang.ClassLoader: ', cowidget.lang.ClassLoader);
        console.debug('[CoWidget.factory] cowidget.lang.ClassLoade.getProxyHandler: ', cowidget.lang.ClassLoader.getProxyHandler());
    };

    console.debug('[CoWidget.factory] currentBaseHref: ', currentBaseHref);
    console.debug('[CoWidget.factory] cowidget.common: ', cowidget.common);
    var defaultConfig = cowidget.common.Util.mixin({
        version: '1.0',
        place: '#cowidget',
        baseHref: currentBaseHref,
        isMock: true,
        'null': null
    }, userConfig);

    class CoWidget extends cowidget._base.CoWidgetImpl {
    	// static get defaultConfig() {
    		
    	// }
    	
    	placeAt(place) {
            var self = this;
            console.debug('[CoWidget.placeAt] self: ', self);
			
            
            dojo.ready(0, function() {
            	
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
	                self.widget.placeAt(place, 'only');
            	}
                // plugin ajax method
            });
            
            return self;
        };
    }

    Object.assign(CoWidget, {
    	'container' : container,
    	'defaultConfig' : defaultConfig}); 
    console.debug('[CoWidget.factory] CoWidget.test: ', CoWidget.test());
    console.debug('[CoWidget.factory] CoWidget: ', CoWidget);

    return CoWidget;
})));
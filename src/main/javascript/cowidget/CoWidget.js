/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development. To get sources and documentation, please visit:
 * http://cowidget.rawya.net
 */
(function(global, factory) {
	'use strict';
    if (false) {
        // TODO Error: multipleDefine for define
        typeof exports === 'object' && typeof module != 'undefined' ?
            module.exports = factory() : typeof define === 'function' && define.amd ?
            define(factory) : (global.CoWidget = factory(global, coWidgetConfig));
    } else if (false) {} else {
        var coWidgetConfig = global.coWidgetConfig ? global.coWidgetConfig : {};
        global.CoWidget = global.CoWidget ? global.CoWidget : factory(global, coWidgetConfig);

        Object.assign(global.CoWidget, {
        	'coWidgetConfig' : coWidgetConfig
        });
        console.debug('[Universal JS module loader] global.CoWidget: ', global.CoWidget ? 'success' : 'failure');
    }

}(this, (function(container, userConfig) {
    'use strict';

    let emptyObject = {};
    Object.freeze(emptyObject);

    {
    	/* prepare Class for usage */
    	
    	class _CoWidgetClass {
	    	static assertSame(targetClass) {
	    		console.debug('[_CoWidgetClass.assertSame] targetClass.name: ', (null === targetClass ? 'null':targetClass.name));
	    		return null === targetClass ? false:(this === targetClass);
	    	}
    	}
    	
    	class Util {
    		
    		static getCurrentScripUrl(/* document */ doc) {
    			let jsScripts = doc.scripts;
    			
    			let currentScriptUrl = jsScripts[jsScripts.length - 1];
    			console.debug('[Util.getCurrentScripUrl] currentScriptUrl: ', currentScriptUrl);
    			
    	        return currentScriptUrl;
    		}
    		
    		static getBaseHref(/* document */ doc) {
    			let currentScript = Util.getCurrentScripUrl(doc);

    	        console.debug('[Util.getBaseHref] currentScript: ', currentScript);

    	        let currentHref = currentScript && currentScript.src ? currentScript.src : './';

    	        console.debug('[Util.getBaseHref] currentHref: ', currentHref);
    	        let currentBaseHref = currentHref ? currentHref.replace('/cowidget/CoWidget.js', '') : './';
    	        console.debug('[Util.getBaseHref] currentBaseHref: ', currentBaseHref);

    	        return currentBaseHref;
    		}
    	}
    	
    	class NetXhr extends _CoWidgetClass {
			constructor(xhrProps) {

		    }
			
			static get xhrProps() {
				return {
					/* options: text|html|xml|json|classloader */
					handleAs: 'text',
					
					/* is sync request */
					sync: true
				};
			}
			
			static eval(jsBody) {
		    	// console.debug('[TestClass.eval] classBody: ', classBody);
				let retObj;
				try {
					retObj = Function('return (' + jsBody + ');')();
				}catch(exception) {
					retObj = null;
					
					console.error('[NetXhr.eval] jsBody: ', jsBody);
					console.error('[NetXhr.eval] exception: ', exception);
					
					throw exception;
				}
				return retObj;
			}
			
			static xhr( /* bar._base._XhrArgss */ xhrProps) {				
				let response = '';
				
				xhrProps = xhrProps ? xhrProps : Object.assign({}, NetXhr.xhrProps);
			        
				if(false) {
				// async function asyncCall(xhrProps) {
					NetXhr._xhrPromise(xhrProps);
					console.log('[NetXhr.xhr] xhrProps: ', xhrProps);	
				// }
				}else{
					NetXhr._xhr(xhrProps);
					console.log('[NetXhr.xhr] response: ', response);
				}
				
				return xhrProps.response;
			}
			
			static _xhrLoad(xhr, xhrProps, event) {
				let response = '';
				
				console.debug('[NetXhr.xhr._xhrLoad] xhr: ', xhr);
				console.debug('[NetXhr.xhr._xhrLoad] event: ', event);
                // This is called even on 404 etc
                // so check the status

				console.debug('[NetXhr.xhr._xhrLoad] xhr.status: ', xhr.status);
                if (200 === xhr.status) {
                    // Resolve the promise with the response text
                    Object.assign(xhrProps, { response : xhr.response });
                    
                    if(xhrProps.load) {
        				console.debug('[NetXhr.xhr._xhrLoad] xhrProps.load is exsits: ');
                    	if ('json' === xhrProps.handleAs) {
                    		xhrProps.load(NetXhr.eval(xhr.response));
                    	}else if ('classloader' === xhrProps.handleAs) {
                    		xhrProps.load(NetXhr.eval(xhr.response));
                    	}else {
                    		xhrProps.load(xhr.response);
                    	}
                    }else {
        				console.debug('[NetXhr.xhr._xhrLoad] xhrProps.load is not exsits: ');
                    	xhrProps.load(NetXhr.eval(xhr.response));
                    }
                } else {
                    if(xhrProps.error) { 
                		xhrProps.error(xhr.statusText);
                	}
                }
                
                return response;
			}
			
			static _xhr( /* NetXhr._xhrProps */ xhrProps) {
		        let xhrReq = new XMLHttpRequest();
	            // req.open('GET', '/ExampleWeb/mock/data/usecase.json?');
		        xhrReq.open(xhrProps.method ? xhrProps.method : 'GET', xhrProps.url, xhrProps.sync);
	            
		        xhrReq.onload = (event) => {
	            	NetXhr._xhrLoad(xhrReq, xhrProps, event);
	            };
	            // Handle network errors
	            xhrReq.onerror = (event) => {
	            	// response = 'Network Error';
	            	// New Error('Network Error');
	            	
	            	// throw 'Error2';
	            };

	            // Make the request
	            xhrReq.send();
		    }

		    static _xhrPromise( /* bar._base._XhrArgss */ xhrProps) {
		        let retObj = null;

		        xhrProps = xhrProps ? xhrProps : {};
		        if (typeof xhrProps.sync === 'undefined') {
		            xhrProps.sync = true;
		        }
		        // const xhrPromise = new Promise(xhrProps);
		        // promise.then(/*successCallback*/function() {},
				// /*failureCallback*/function() {});
		        
		        let xhrPromise = new Promise( /* executor */ function(resolve, reject) {
		        	
	        		// Do the usual XHR stuff
		            let req = new XMLHttpRequest();
		            // req.open('GET', '/ExampleWeb/mock/data/usecase.json?');
		            req.open(xhrProps.method ? xhrProps.method : 'GET', xhrProps.url, xhrProps.sync);

		            req.onload = function() {
		                // This is called even on 404 etc
		                // so check the status
		                if (200 === req.status) {
		                    // Resolve the promise with the response text
		                    resolve(req.response);
		                } else {
		                    // Otherwise reject with the status text
		                    // which will hopefully be a meaningful error
		                    reject(Error(req.statusText));
		                }
		            };

		            // Handle network errors
		            req.onerror = function() {
		                reject(Error("Network Error"));
		            };

		            // Make the request
		            req.send();
		        }).then(function(result) {
		        	Object.assign(xhrProps, {response: result});
		        	
		        	let retClass = TestClass.eval(xhrProps.response);
					console.debug('[TestClass._xhrPromise] retClass: ', retClass);
		        	
 				}).catch(function(result) {
 					console.log('Do catch: ', result);
 					xhrProps.resObj = null;
 					
 					return null;
 				});
		    }
		}
    	
	    class ClassLoader extends _CoWidgetClass {
// static get log() {
// return LogFactory.getLog(ClassLoader);
// }
    	    
    	    constructor(options) {
    	    	console.error('[ClassLoader.constructor] not work');
    	    	throw new Error('not work');
            }
    	    
    	    static getClassLoader() {
    	    	let self = this;
    	    	
    	    	return self;
    	    }
    	    
    	    static loadClass(name) {
    	    	let self = this;
    	    	let retClass = null;
    	    	console.debug('[ClassLoader.loadClass] name: ' + name);
    	    	
    	    	if('cowidget.ClassLoader' === name) {
					retClass = (function() {return ClassLoader;})();
    	    	}else if('cowidget.NetXhr' === name) {
					retClass = (function() {return NetXhr;})();
    	    	}else if('cowidget.Util' === name) {
					retClass = (function() {return Util;})();
				}else {
    	    		let targetUrl = ClassLoader.baseHref + '/' + name.replace(/\./gi, '/') + '.js';
        	    	console.debug('[ClassLoader.loadClass] targetUrl: ' + targetUrl);
        	    	
    				let xhrProps = {
    						url: targetUrl,
    						sync: false,
    						handleAs: 'classloader',
    						
    						load: (data) => {
    							retClass = data;
    						}
    				}
    				
    				NetXhr.xhr(xhrProps);
    				console.debug('[ClassLoader.loadClass] xhrProps: ', xhrProps);
    				console.debug('[ClassLoader.loadClass] xhrProps.response: ' + xhrProps.response);
    				// retClass = NetXhr.eval(xhrProps.response);
    				console.debug('[ClassLoader.loadClass] retClass: ', retClass);
    				
// console.debug('[ClassLoader.loadClass] retClass.assertSame: ' + name + ', ' +
// ClassLoader.name);
// console.debug('[ClassLoader.loadClass] retClass.assertSame: ',
// retClass.assertSame(ClassLoader));
// if('undefined' != typeof retClass.assertSame && false ===
// retClass.assertSame(ClassLoader)) {
// console.debug('[ClassLoader.loadClass] extends retClass.assertSame: ',
// retClass);
// }
    	    	}
    	    	
    	    	return retClass;
    	    }
    	    
    	    static getProxyHandler() {
    	    	let self = this;
    	    	
    	        return {    	        	
    	            'get': function(obj, prop, receiver) {// obj, prop
    	            	if ('undefined' === typeof obj[prop]) {
        	                console.debug('[ClassLoader.proxyHandler.get] obj: ' + (typeof obj), obj);
        	                console.debug('[ClassLoader.proxyHandler.get] prop: ' + (typeof prop), prop);
        	                console.debug('[ClassLoader.proxyHandler.get] prop.toString: ' + prop.toString());
    	            	}

// console.debug('[ClassLoader.proxyHandler]
// obj[\'Symbol(Symbol.toPrimitive)\']: ' + (typeof
// obj['Symbol(Symbol.toPrimitive)']));
// console.debug('[ClassLoader.proxyHandler] obj[\'Symbol\']: ' + (typeof
// obj['Symbol']));
// console.debug('[ClassLoader.proxyHandler] obj[\'Symbol.toPrimitive\']: ' +
// (typeof obj['Symbol.toPrimitive']));
// console.debug('[ClassLoader.proxyHandler] obj[\'toPrimitive\']: ' + (typeof
// obj['toPrimitive']));

    	                if ('then' === typeof prop) {
    	                    console.debug('[ClassLoader.proxyHandler.get] obj instanceof Symbol');
    	                    return function(hint) {
    	                        console.debug('[ClassLoader.proxyHandler.get] obj instanceof Symbol: ', obj.prop);
    	                        // return obj.toString();
    	                        return obj.prop;
    	                    };
    	                }else if ('symbol' === typeof prop) {
    	                    console.debug('[ClassLoader.proxyHandler.get] obj instanceof Symbol');
    	                    return function(hint) {
    	                        console.debug('[ClassLoader.proxyHandler.get] obj instanceof Symbol: ', obj.prop);
    	                        // return obj.toString();
    	                        return obj.prop;
    	                    };
    	                }else if (typeof obj[prop] === 'undefined') {
    	                	if (prop.match(/[\-]{0,1}[A-Z]{1,1}/)) {
                                // match naming Class
                                obj[prop] = ClassLoader.loadClass(obj.packageName + '.' + prop);
                                
                                if(obj[prop]) {
                                	 // Object.assign(obj[prop], {
                                     // packageName: obj.packageName,
                                     // className: prop
                                     // });
                                }
                            } else {
                                // match naming Package
                                let packageObj = {};// ClassLoader.loadClass(obj.packageName
													// + '.' + prop +
													// '.package');

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
    	    
    	    /**
			 * TODO
			 */
    	    mixinClass(target, ...source) {
// //Traditional JavaScript Mixins
    	    	for (var prop in source) {
    	    	    if (source.hasOwnProperty(prop)) {
    	    	      target[prop] = source[prop];
    	    	    }
    	    	  }
    	    }
    	}
    	
    	Object.assign(ClassLoader, {
        	baseHref: Util.getBaseHref(container.document),
        	'container' : container
    	});
	    
        // package lazy loading
    	container.cowidget = container.cowidget ? container.cowidget : new Proxy({
            packageName: 'cowidget',
        }, ClassLoader.getProxyHandler());
    };
    
    /* start plugin */
    //console.debug('[CoWidget.factory] container: ', container);
    console.debug('[CoWidget.factory] userConfig: ', userConfig);

    console.debug('[CoWidget.factory] Util.getBaseHref(container.document): ', cowidget.common.Util.getBaseHref(container.document));
    let defaultConfig = cowidget.common.Util.mixin({
        version: '1.0',
        place: '#cowidget',
        baseHref: cowidget.common.Util.getBaseHref(container.document),
        isMock: true,
        'null': null
    }, userConfig);
    console.debug('[CoWidget.factory] CoWidgetConfig: ', defaultConfig);
    
    /* start up */
    class CoWidget extends cowidget._base.CoWidgetImpl {
    	// static get defaultConfig() {
    		
    	// }
    	
    	placeAtFork(place) {
            var self = this;
            console.debug('[CoWidget.placeAt] self: ', self);
            
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
    }

    Object.assign(CoWidget, {
    	'container' : container,
    	'configure' : defaultConfig}); 
    console.debug('[CoWidget.factory] CoWidget.test: ', CoWidget.isWork());
    // console.debug('[CoWidget.factory] CoWidget: ', CoWidget);

    return CoWidget;
})));
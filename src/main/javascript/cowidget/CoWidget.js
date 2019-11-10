/*
 * Copyright 2019 CoWidget RawYa HOME. Licensed under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
(function(global, factory) {
	'use strict';
	
    if (false) {
        // TODO Error: multipleDefine for define
        typeof exports === 'object' && typeof module != 'undefined' ?
            module.exports = factory() : typeof define === 'function' && define.amd ?
            define(factory) : (global.CoWidget = factory(global, coWidgetConfig));
    } else if (false) {
    	
    } else {
        let coWidgetConf = global.coWidgetConfig ? global.coWidgetConfig : (coWidgetConfig ? coWidgetConfig:{});
        console.debug('[Universal JS module loader] coWidgetConf: ', coWidgetConf);
        
        global.CoWidget = global.CoWidget ? global.CoWidget : factory(global, coWidgetConf);

        // Object.assign(global.CoWidget, {
        	// 'coWidgetConfig' : coWidgetConf
        // });
        console.debug('[Universal JS module loader] global.CoWidget: ', global.CoWidget ? 'success' : 'failure');
    }

}(this, (function(container, userConfig) {
    'use strict';

    let emptyObject = {};
    Object.freeze(emptyObject);

    {
    	/* prepare Class for usage */
    	class Util {
    	}
    	
    	class _CoWidgetClass {
	    	static assertSame(targetClass) {
	    		console.debug('[_CoWidgetClass.assertSame] targetClass.name: ', (null === targetClass ? 'null':targetClass.name));
	    		return null === targetClass ? false:(this === targetClass);
	    	}
    	}
    	
    	class UrlUtil {
    		
    		static getCurrentScrip(/* document */ doc) {
    			doc = doc ? doc:wondow.document;
    			
    			let jsScripts = doc.scripts;
    			
    			let currentScript = jsScripts[jsScripts.length - 1];
    			console.debug('[UrlUtil.getCurrentScrip] currentScript: ', currentScript);
    			
    	        return currentScript;
    		}
    		
    		static getBaseHref(container) {
    			let baseHref = '';
    			
    			let pathArray = window.location.pathname.split('/');
    			pathArray.forEach(function(item, index, array) {
    				// console.log('[UrlUtil.getBaseHref] item, index):, ',
					// item, index);
    				if(1 === index) {
    					baseHref = '/' + item;
    				}
				});
    			console.debug('[UrlUtil.getBaseHref] baseHref: ', baseHref);

    	        return baseHref;
    		}
    		
    		static getCurrentHref(/* document */ doc) {
    			doc = doc ? doc:wondow.document;
    			let currentScript = UrlUtil.getCurrentScrip(doc);

    	        console.debug('[UrlUtil.getCurrentHref] currentScript: ', currentScript);

    	        let currentHref = currentScript && currentScript.src ? currentScript.src : './';

    	        console.debug('[UrlUtil.getCurrentHref] currentHref: ', currentHref);
    	        let currentBaseHref = currentHref ? currentHref.replace('/cowidget/CoWidget.js', '') : './';
    	        console.debug('[UrlUtil.getCurrentHref] currentBaseHref: ', currentBaseHref);

    	        return currentBaseHref;
    		}
    	}
    	
    	class NetXhr extends _CoWidgetClass {
			constructor(xhrProps) {

		    }
			
			static get xhrArgs() {
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
					// var jsObj = new Function('jsBody', 'b', 'return
					// (jsBody);');

					// Call the function
					// jsObj(jsBody);
					
					// TODO
// let jsObj = Function(jsBody);
// console.debug('[NetXhr.eval] jsObj: ', jsObj);
// retObj = (new Function(jsBody, 'return jsBody;'))(jsBody);
					
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
				
				xhrProps = xhrProps ? xhrProps : Object.assign({}, NetXhr.xhrArgs);
			        
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
			
			static _xhr( /* NetXhr._xhrProps */ xhrProps) {
		        let xhrReq = new XMLHttpRequest();
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
			
			static _xhrLoad(xhr, xhrProps, event) {
				let response = '';
				
				console.debug('[NetXhr.xhr._xhrLoad] xhr: ');
				// console.debug('[NetXhr.xhr._xhrLoad]', xhr);
				// console.debug('[NetXhr.xhr._xhrLoad] event: ', event);
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
        				response = xhr.response;
                    }
                } else {
                    if(xhrProps.error) { 
                		xhrProps.error(xhr.statusText);
                	}
                }
                
                return response;
			}
		}
    	
	    class ClassLoader {
    	    
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
					retClass = (() => {return ClassLoader;})();
					Object.defineProperty(retClass, 'packageName', {
                		value: 'cowidget',
                		writable: false
                	});
    	    	}else if('cowidget.NetXhr' === name) {
					retClass = (function() {return NetXhr;})();
					Object.defineProperty(retClass, 'packageName', {
                		value: 'cowidget',
                		writable: false
                	});
    	    	}else if('cowidget.UrlUtil' === name) {
					retClass = (function() {return UrlUtil;})();					
					Object.defineProperty(retClass, 'packageName', {
                		value: 'cowidget',
                		writable: false
                	});
    	    	}else if('cowidget.Util' === name) {
					retClass = (function() {return Util;})();					
					Object.defineProperty(retClass, 'packageName', {
                		value: 'cowidget',
                		writable: false
                	});
				}else {
					let prePackage = name.split('.', 1);
					let baseHref = ClassLoader.packageMap[prePackage+''];
					console.debug('[ClassLoader.loadClass] baseHref: ' + baseHref);
					let targetUrl = '';
					if(null != baseHref.match(/^http(s)?:\/\/.+/)) {
						targetUrl = baseHref + '/../' + name.replace(/\./gi, '/') + '.js';
					}else {
						targetUrl = baseHref + '/../' + name.replace(/\./gi, '/') + '.js';
					}
        	    	console.debug('[ClassLoader.loadClass] targetUrl: ' + targetUrl);
        	    	
    				let xhrProps = {
    						url: targetUrl,
    						sync: false,
    						handleAs: 'classloader',
    						
    						load: (srcClass) => {
    							console.debug('[ClassLoader.loadClass] srcClass.name: ', srcClass.name);
    							console.debug('[ClassLoader.loadClass] srcClass.constructor.name: ', (srcClass.constructor ? srcClass.constructor.name:null));
    							console.debug('[ClassLoader.loadClass] srcClass.packageName: ', srcClass.packageName);
    							// console.debug('[ClassLoader.loadClass]
								// srcClass.constructor.packageName: ',
								// (srcClass.constructor ?
								// srcClass.constructor.packageName:null));
    							console.debug('[ClassLoader.loadClass] srcClass PrototypeOf: ', Object.getPrototypeOf(srcClass));
    							console.debug('[ClassLoader.loadClass] srcClass prototype: ', srcClass.prototype);
    							console.debug('[ClassLoader.loadClass] srcClass: ', srcClass);
    							
// if(srcClass instanceof cowidget.lang.ClassLoader) {
// retClass = srcClass;
// }else
    							if ('cowidget.lang.ClassLoader' === name){
    								retClass = srcClass;
    							}else if(false) {
    								retClass = new Proxy(srcClass.prototype, cowidget.lang.ClassLoader.getPrototypeProxyHandler());
    							}else {
    								if(false && 'cowidget.common.Log' != name) {
	    								// force LOG
	    								let log = new cowidget.common.Log(srcClass);
	    								Object.defineProperty(srcClass.prototype, 'LOG', {
	    									value: log,
	    									writable: false
	    								});
    								}
    								retClass = srcClass; // new
															// Proxy(srcClass.prototype,
															// cowidget.lang.ClassLoader.getClassProxyHandler());
    							}
    						}
    				}
    				
    				NetXhr.xhr(xhrProps);
    				// console.debug('[ClassLoader.loadClass] xhrProps: ',
					// xhrProps);
    				// console.debug('[ClassLoader.loadClass] xhrProps.response:
					// ' + xhrProps.response);
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
    	                        // return Reflect.get(target, propertyName,
								// receiver);
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
    	                		let retClass = ClassLoader.loadClass(obj.packageName + '.' + prop);
                                
    	                		/* extends to packageName */
                                if(retClass) {
                                	try {
                                    	Object.defineProperty(retClass, 'packageName', {
                                    		value: obj.packageName,
                                    		writable: false
                                    	});
                                    	
                                    	obj[prop] = retClass;
                                	}catch(exception) {
                                		console.error('[ClassLoader.proxyHandler.get] exception: ', exception);
                                	}finally {
                                		
                                	}
                                }else {
                                	console.error('[ClassLoader.proxyHandler.get] failure generate Class: obj, prop: ', obj, prop);
                                	// TODO throw new Error();
                                }
                            } else {
                                // match naming Package
                                let packageObj = {};

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
    	                
    	                // console.debug('[ClassLoader.proxyHandler.get]
						// obj[prop]: ', obj ? obj[prop]:null);
    	                
    	                return obj[prop];
    	            },

    	            none: null
    	        }
    	    }
    	    
    	    static isClass(obj) {
    	    	const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';
				if(obj.prototype === undefined) {
				  return isCtorClass
				}
				const isPrototypeCtorClass = obj.prototype.constructor
					&& obj.prototype.constructor.toString
					&& obj.prototype.constructor.toString().substring(0, 5) === 'class';
				return isCtorClass || isPrototypeCtorClass
    	    }
    	}
	    
	    // Package Map
	    let packageMap = userConfig.packages ? userConfig.packages:{};
	    packageMap = Object.assign(packageMap, {
	    		cowidget: UrlUtil.getCurrentHref(container.document) + '/cowidget'
	    	});
		console.debug('[CoWidget.factory] packageMap: ', packageMap);
    	
		Object.defineProperty(ClassLoader, 'baseHref', {
    		value: UrlUtil.getCurrentHref(container.document),
    		writable: false
    	});
		
		Object.defineProperty(ClassLoader, 'container', {
    		value: container,
    		writable: false
    	});
		
		Object.defineProperty(ClassLoader, 'packageMap', {
    		value: packageMap,
    		writable: true
    	});
		
    	// let package lazy loading like java
    	Object.keys(packageMap).forEach(function(key, index, array) {
    		console.debug('[CoWidget.factory] key: ', key);
    		
    		console.log(key);
    		container[key] = container[key] ? container[key] : new Proxy({
                packageName: key,
            }, ClassLoader.getProxyHandler());
    	});
       
// packageMap.forEach((value, key, map) => {
// console.log(key);
// container[key] = container[key] ? container[key] : new Proxy({
// packageName: key,
// }, ClassLoader.getProxyHandler());
// });
    };
    
    /* start plugin */
    // console.debug('[CoWidget.factory] container: ', container);
    console.debug('[CoWidget.factory] userConfig: ', userConfig);

    console.debug('[CoWidget.factory] UrlUtil.getCurrentHref(container.document): ', cowidget.common.UrlUtil.getCurrentHref(container.document));
    let defaultConfig = cowidget.common.Util.mixin({
        version: '1.0',
        baseHref: cowidget.common.UrlUtil.getCurrentHref(container.document),
        'null': null
    }, userConfig);
    
    /* start up */
    class CoWidget extends cowidget._base.CoWidgetImpl {
    }
    
    /* static field value */
    Object.defineProperty(CoWidget, 'configure', {
		value: defaultConfig,
		writable: false
	});
    
 	// cowidget.common.LogFactory.getLog().debug('[CoWidget.factory]
	// CoWidgetConfig: ', defaultConfig);
	// cowidget.common.LogFactory.getLog().debug('[factory] CoWidget work test:
	// ', CoWidget.isWork());
	// cowidget.common.LogFactory.getLog().debug('[factory] CoWidget: ',
	// CoWidget);

    return CoWidget;
})));
/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class ClassLoader extends cowidget.ClassLoader {
	
	static get LOG() {
		return cowidget.common.LogFactory.getLog(this);
	}
	
	/**
     * This method searches for classes in the same manner as the {@link
     * #loadClass(String, boolean)} method. It is invoked by the Java virtual
     * machine to resolve class references. Invoking this method is equivalent
     * to invoking {@link #loadClass(String, boolean) <tt>loadClass(name, false)</tt>}.
     * </p>
     * 
     * @param name
     *            The name of the class
     * 
     * @param resolve
     * 
     * @return The resulting <tt>Class</tt> object
     * 
     * @throws Error('ClassNotFoundException')
     *             If the class was not found
     */
	static fork(name, resolve) {
		
	}
    
    /**
	 * TODO for chrome static filed
	 */
	static getClassProxyHandler() {
    	let self = this;
    	
    	return {    	        	
    		get: (obj, prop, receiver) => {
    			if ('undefined' != typeof obj[prop]) {
    				console.debug('[ClassLoader.getClassProxyHandler.get] obj: ' + (typeof obj));
    				//console.debug('[ClassLoader.getClassProxyHandler.get] obj: ' + (typeof obj), obj);
	                console.debug('[ClassLoader.getClassProxyHandler.get] obj isClass: ' + ClassLoader.isClass(obj));
	                console.debug('[ClassLoader.getClassProxyHandler.get] prop: ' + (typeof prop), prop);
	                console.debug('[ClassLoader.getClassProxyHandler.get] prop.toString: ' + prop.toString());
            	}
    			
    			if('function' === typeof obj && 'getLog' === prop) {
    				//obj[prop] = obj.prototype[prop];
    			}
    			
    			return obj[prop];
            }
    	}
	}
	
	/**
	 * TODO for chrome static filed
	 */
	static getPrototypeProxyHandler() {
    	let self = this;
    	
    	return {
			get: (target, prop, receiver) => {
				console.debug('[ClassLoader.getPrototypeProxyHandler.get] target: ' + (typeof target));
				console.debug('[ClassLoader.getPrototypeProxyHandler.get] prop: ' + prop);
				if (prop === 'secret') {
					return '${target.secret.substr(0, 4)} ... shhhh!';
				} else {
					return Reflect.get(target, prop);
					//return target.prop;
				}
			},

    		apply: (target, that, arg) => {
				console.debug('[ClassLoader.getPrototypeProxyHandler.apply] target: ' + (typeof target));
    			if ('undefined' != typeof target) {
//    				//console.debug('[ClassLoader.getClassProxyHandler.get] obj: ' + (typeof obj), obj);
//	                console.debug('[ClassLoader.getPrototypeProxyHandler.get] obj isClass: ' + ClassLoader.isClass(obj));
//	                console.debug('[ClassLoader.getPrototypeProxyHandler.get] prop: ' + (typeof prop), prop);
//	                console.debug('[ClassLoader.getPrototypeProxyHandler.get] prop.toString: ' + prop.toString());
            	}
//    			
//    			if('function' === typeof obj && 'getLog' === prop) {
//    				//obj[prop] = obj.prototype[prop];
//    			}
    			
    			target.apply(that, args);
    			//base.apply(that, args);
    			//return obj[prop];
            },
    		
            getPrototypeOf: (target) => {
				console.debug('[ClassLoader.getPrototypeProxyHandler.apply] target: ' + (typeof target));
    			if ('undefined' != typeof target) {
//    				//console.debug('[ClassLoader.getClassProxyHandler.get] obj: ' + (typeof obj), obj);
//	                console.debug('[ClassLoader.getPrototypeProxyHandler.get] obj isClass: ' + ClassLoader.isClass(obj));
//	                console.debug('[ClassLoader.getPrototypeProxyHandler.get] prop: ' + (typeof prop), prop);
//	                console.debug('[ClassLoader.getPrototypeProxyHandler.get] prop.toString: ' + prop.toString());
            	}
//    			
//    			if('function' === typeof obj && 'getLog' === prop) {
//    				//obj[prop] = obj.prototype[prop];
//    			}
    			
    			sup.apply(that, args);
    			base.apply(that, args);
    			//return obj[prop];
            }
    	}
	}
	
	//static loadClass(name) {
	//	return super.loadClass(name);
	//}
}
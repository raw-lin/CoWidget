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
    		'get': function(obj, prop, receiver) {
            	
    			return obj[prop];
            }
    	}
	}
	
	//static loadClass(name) {
	//	return super.loadClass(name);
	//}
}
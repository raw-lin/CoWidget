/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class ClassUtil {
	static get LOG() {
		return cowidget.common.LogFactory.getLog(UrlUtil);
	}
	
    constructor(...props) {

    }
    
    /**
     * <pre>
     * <code>
	 * class Fork extends ClassUtil.assignStaticField({
	 * 									STATIC_FIELD01: {
	 *										value: 'a STATIC_FIELD01 by defineProperty',
	 *										writable: true
	 *									}
	 * 								});
	 * </code>
	 * </pre>
	 * 
	 * @param	staticField	{}
	 */
    static assignStaticField(staticField) {
    	class StaticFieldClass {
			
		}
		
		for(let staticFieldName in staticField) {
			Object.defineProperty(StaticFieldClass, staticFieldName, {
                value: staticField[staticFieldName],
                writable: true
            });
		}
		
		return StaticFieldClass;
    }
    
    
    /**
     * NOT Work
     */
    static mixinClass(targetClass, ...mixins) {		
		let retClass;
		
		const mixinProps = (targetPrototype, sourcePrototype) => {
			for(let prop in sourcePrototype) {
				if (!/^constructor$/.test(prop)) {
					Object.defineProperty(targetPrototype, prop, Object.getOwnPropertyDescriptor(sourcePrototype, prop));
				}
			}
			Object.getOwnPropertyNames(sourcePrototype).forEach((prop) => {
					if (!/^constructor$/.test(prop)) {
						Object.defineProperty(targetPrototype, prop, Object.getOwnPropertyDescriptor(sourcePrototype, prop));
					}
				})
			};
		
		if (targetClass && 'function' === typeof targetClass) {
			retClass = class extends targetClass {
				constructor(...props) {
					super(...props);
				}
			};
		
			mixins.forEach((sourceClass)=>{
				mixinProps(retClass.prototype, sourceClass.prototype);
			});
		} else {
			retClass = class {};
		}
		return retClass;
	}
}

/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class _Base {
	
	static get constructorOpts() {
		return {
			/* arg01 */ arg01: null,
			/* arg02 */ arg02: null,
			/* arg02 */ arg03: null
		}
	}

    constructor(/**/options) {
        let self = this;
        options = options ? options : {};

        console.log('[_Base.constructor] self: ', self);
        console.log('[_Base.constructor] options: ', options);

        // self.adapter = new Objecy();
        self.metaData = option ? option : {};
    }
	
    static foo() {
        console.log('[_Base.foo] call');
    }

    getBase() {
        var self = this;
        return self;
    }
}

/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class _Base {
	
    static foo() {
        console.log('[_Base.foo] call');
    };

    constructor(options) {
        var self = this;
        options = options ? options : {};

        console.log('[_Base.constructor] self: ', self);
        console.log('[_Base.constructor] options: ', options);

        // self.adapter = new Objecy();
        self.metaData = option ? option : {};
    };

    getBase() {
        var self = this;
        return self;
    };
}

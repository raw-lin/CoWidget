/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */
class _Singleton {
	static get LOG() {
		return cowidget.common.LogFactory.getLog(_Singleton);
	}

	/**
	 * TODO
	 */
	constructor(options) {
        let self = this;
        options = options ? options : {};

        self.options = options;
        
        self.count = 1;
        
        _Singleton.LOG.debug('[_Singleton.constructor] self: ', self);
    }
	
	/**
	 * TODO
	 */
	static getInstance() {
		
		if('undefined' === typeof _Singleton._instance) {
			Object.defineProperty(_Singleton, '_instance', {
					value: new _Singleton(),
					writable: false
				});
		}
		
		// MockService.LOG.debug('[getInstance] MockService._instance: ',
		// MockService._instance);
		return _Singleton._instance;
	}
	
	/**
	 * TODO
	 */
	fork() {
		_Singleton.LOG.debug('[_Singleton.fork] fork');
		_Singleton.LOG.debug('[_Singleton.fork] count: ', this.count);
		
		this.count = this.count + 1;
        
        return 'I am _Singleton';
    }
}

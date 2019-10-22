/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */
class _Singleton {

	/**
	 * TODO
	 */
	constructor(/**/options) {
        let self = this;
        options = options ? options : {};

        self.options = options;
        
        self.count = 1;
        
        console.log('[_Singleton.constructor] self: ', self);
    }
	
	/**
	 * TODO
	 */
	static getInstance() {
		if('undefined' === typeof _Singleton.instance){
			Object.assign(_Singleton, {
				instance : new _Singleton()
			});
		}
		return _Singleton.instance;
	}
	
	/**
	 * TODO
	 */
	fork() {
		console.log('[_Singleton.fork] fork');
		console.log('[_Singleton.fork] count: ', this.count);
        
        return 'I am _Singleton';
    }
}

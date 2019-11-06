/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class NetXhr {
	
	static get LOG() {
		return cowidget.common.LogFactory.getLog(NetXhr);
	}
	
	constructor(xhrArgs) {
		//super(executor);
		
		let self = this;
		// super(xhrArgs);
		NetXhr.LOG.debug('[constructor] xhrArgs: ', self);
		Object.assign(self, {xhrArgs: xhrArgs});
	}
	
	static requestX(xhrArgs) {
		NetXhr.LOG.debug('[request] xhrArgs: ', xhrArgs);
		
		if('undefined' === typeof xhrArgs.sync) {
			xhrArgs.sync = true;
		}
		
		let xhr = new XMLHttpRequest();
		
		Object.assign(xhrArgs, {
			'xhr': xhr
		});
		
		let netXhr = new NetXhr(xhrArgs);
		
		if('undefined' === typeof xhrArgs.handleAs) {
			xhr.onload = () => {};
		}else if('json' === xhrArgs.handleAs) {
			
		}
		
	}
	
	
	static handleResponse(xhrArgs, xhr) {
		
		let result = null;
		
		NetXhr.LOG.debug('[handleResponse] xhrArgs.handleAs: ', xhrArgs.handleAs);
		
		if('undefined' === typeof xhrArgs.handleAs) {
			result = xhr.response;
		}else if('json' === xhrArgs.handleAs) {
			result = JSON.parse(xhr.response);
		}
		
		NetXhr.LOG.debug('[handleResponse] result: ', result);
		
		return result;
	}
	
	static request(xhrArgs) {

		NetXhr.LOG.debug('[request] xhrArgs: ', xhrArgs);
		
		let netXhr = new NetXhr(xhrArgs);
				
		if('undefined' === typeof xhrArgs.sync) {
			xhrArgs.sync = true;
		}
		
		
		let xhr = new XMLHttpRequest();
		xhr.open(xhrArgs.method ? xhrArgs.method:'GET', xhrArgs.url, xhrArgs.sync);
		
		//xhr.setRequestHeader();
		xhr.onloadstart = () => {
			NetXhr.LOG.debug('[request.onloadstart] xhr: ', xhr);
			
		};
		
		xhr.onloadend = () => {
			NetXhr.LOG.debug('[request.onloadend] xhr: ', xhr);
		};
		
		xhr.onload = () => {
			NetXhr.LOG.debug('[request.onload] xhr: ', xhr);			
			Object.assign(netXhr, {result: NetXhr.handleResponse(xhrArgs, xhr)});
		};
		
		xhr.onerror = () => {
			NetXhr.LOG.error('[request.onerror] xhr: ', xhr);
		};
		
		xhr.onreadystatechange = () => {
			NetXhr.LOG.debug('[request.onreadystatechange] xhr: ', xhr.readyState);
		};
		
		xhr.onprogress = () => {
			NetXhr.LOG.debug('[request.onprogress] xhr: ', xhr);
		};
		
		xhr.ontimeout = () => {
			NetXhr.LOG.error('[request.ontimeout] xhr: ', xhr);
		};
		
		xhr.send(null);
		
		return netXhr;
	}
	
	getResult() {
		let self = this;
		
		return self.result ? self.result:null;
	}
	
	static requestPromise (xhrArgs) {

		NetXhr.LOG.debug('[request] xhrPromise xhrArgs: ', xhrArgs);
		
		let netXhr = new NetXhr(xhrArgs);
		
		if('undefined' === typeof xhrArgs.sync) {
			xhrArgs.sync = true;
		}
		
		if(xhrArgs.sync) {
			let xhrPromise = new Promise((resolve, reject) => {
				let xhr = new XMLHttpRequest();
				xhr.open(xhrArgs.method ? xhrArgs.method:'GET', xhrArgs.url, xhrArgs.sync);
				
				xhr.onload = () => resolve({xhrArgs: xhrArgs, 'xhr': xhr, responseText: xhr.responseText});
				xhr.onerror = () => reject(new Error (xhr.statusText));
				//xhr.send();
				
				xhr.send(null);
				
			});

			Object.assign(netXhr, {xhrPromise: xhrPromise});
		}
		
		return netXhr.xhrPromise;
	}
	
	getPromiseResult() {
		let self = this;
		let result = null;
		NetXhr.LOG.debug('[getResult] call');
		
//		let retPromise = Promise.resolve(self.xhrPromise);
//		
//		let retPromise = await Promise.allSettled([self.xhrPromise]);
//
//		if('fulfilled' === retPromise[0].status) {
//			NetXhr.LOG.debug('[getResult] retPromise: ', retPromise);
//			NetXhr.LOG.debug('[getResult] retPromise[0].value: ', retPromise[0].value);
//			
//			result = retPromise[0].value;
//		}
//
//		NetXhr.LOG.debug('[getResult] result: ', result);
		
		//return result;
		//await Promise.resolve(self.xhrPromise)
		//NetXhr.LOG.debug('[getResult] result: ', Promise.resolve(self.xhrPromise));
		return Promise.resolve([self.xhrPromise]).responseText;
	}
}
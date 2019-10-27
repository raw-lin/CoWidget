/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class NetXhr extends cowidget.NetXhr {
	static request(xhrArgs) {
		
	}
	
	static _xhrPromise( /* bar._base._XhrArgss */ xhrProps) {
		
		class _xhrPromise {
			constructor(options) {
				
			}
		}
		
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
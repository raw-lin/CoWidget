/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class MockService {
	static get LOG() {
		return mock.LogFactory.getLog(MockService);
	}
	
	/**
	 * @private
	 */
	constructor() {
		// super(mOption);
		
		let self = this;
		
		Object.assign(self, {
			userCase : new Map()
		});
	}
	
	static isLoaded() {
		MockService.LOG.debug('[isLoaded] true');
		
		return true;
	}
	
	static getInstance() {
		
		if('undefined' === typeof MockService._instance) {
			Object.defineProperty(MockService, '_instance', {
					value: new MockService(),
					writable: false
				});
		}
		
		//MockService.LOG.debug('[getInstance] MockService._instance: ', MockService._instance);
		return MockService._instance;
	}	
	
	pushUserCase (userCaseURI) {
		let self = this;		
		MockService.LOG.debug('[pushUserCase] userCaseURI: ' + userCaseURI);
		
		let oUrl = cowidget.common.UrlUtil.parser(userCaseURI);
		
		MockService.LOG.debug('[pushUserCase] oUrl: ', oUrl);
		
		let xhrArgs = {
			url: userCaseURI,
			sync: false,
			handleAs: 'json'
		}
	
		let userCase = cowidget.common.NetXhr.request(xhrArgs).getResult();
		
		// Object.assign(self.userCase, userCase);
		self.userCase.set(oUrl.fileBaseName, userCase);
		
		MockService.LOG.debug('[pushUserCase] userCase: ', self.userCase);
		MockService.LOG.debug('[pushUserCase] userCase get: ', self.userCase.get(oUrl.fileBaseName));
	}
	
	getRequest(viewName) {
		let self = this;		
		return self.userCase.get(viewName);
	}
	
	/**
	 * <p>
	 * Formats a date into a specific pattern.yyyy MM dd HH:mm:ssZZ
	 * </p>
	 * 
	 * @param oDate
	 *            the Date Object, not null
	 * @param pattern
	 *            the pattern to use to format the date, not null
	 * @return the formatted date
	 * @since 1.0
	 */
}
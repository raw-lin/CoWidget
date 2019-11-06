/**
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version 2.0 - see LICENSE.
 * 
 * <pre>
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 * </pre>
 */
class MockService extends ((staticField) => {
	class FieldClass {
		
	}
	
// let staticField = {
// STATIC_FIELD01: {
// value: 'a STATIC_FIELD01 by defineProperty',
// writable: true
// },
// STATIC_FIELD02: {
// value: 'a STATIC_FIELD01 by defineProperty',
// writable: true
// }
// }
	
	if('object' === typeof staticField) {
		// defined static field
		for(let staticFieldName in staticField) {
			Object.defineProperty(FieldClass, staticFieldName, staticField[staticFieldName]);
		}
	}
	
	Object.defineProperty(FieldClass, 'UserCase', ()=>{
		return class {
			
		}
	});
	
	return FieldClass;
})() {
	
	static get LOG() {
		return cowidget.common.LogFactory.getLog(MockService);
	}
	
	/**
	 * @private
	 */
	constructor(...props) {
		super(...props);
		
		let self = this;
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
		
// if('undefined' === typeof localStorage.getItem('MockService')) {
// localStorage.setItem('MockService', MockService._instance);
// }
//		
// MockService._instance = localStorage.getItem('MockService');
//		
// //MockService.LOG.debug('[getInstance] MockService._instance: ',
// MockService._instance);
		return MockService._instance;
	}
	
	/**
	 * @private
	 */
	get useCaseStorage() {
		
		if('undefined' === typeof this._useCaseMap) {		
			Object.setPrototypeOf(MockService.prototype, {_useCaseMap: new Map()});
		}
		
		return this._useCaseMap
	}	
	
	/**
	 * @private
	 */
	get storage() {
		// return sessionStorage;
		return localStorage;
	}
	
	prepareUseCase (useCaseURI) {
		let self = this;
		MockService.LOG.debug('[prepareUseCase] useCaseURI: ' + useCaseURI);
		
		let oUrl = cowidget.common.UrlUtil.parser(useCaseURI);
		
		MockService.LOG.debug('[prepareUseCase] oUrl: ', oUrl);
		let xhrArgs = {
			url: useCaseURI,
			sync: false,
			handleAs: 'json'
		}
	
		let useCaseTo = cowidget.common.NetXhr.request(xhrArgs).getResult();
		
		// Object.assign(self.userCase, userCase);
		self.useCaseStorage.set('MockService.' + useCaseTo.viewName, useCaseTo);
		
		self.storage.setItem('MockService.' + useCaseTo.viewName, JSON.stringify(useCaseTo));
		// console.debug('[pushUseCase] useCaseStorage: ',
		// self.storage.getItem('MockService.' + useCaseTo.viewName));
		
		// MockService.LOG.debug('[pushUseCase] useCaseStorage: ',
		// self.useCaseStorage);
		// MockService.LOG.debug('[pushUseCase] useCaseStorage get: ',
		// self.useCaseStorage.get(oUrl.fileBaseName));
	}
	
	prepareUseCaseStep (useCaseStepURI) {
		let self = this;
		
		let xhrArgs = {
				url: useCaseStepURI,
				sync: false,
				handleAs: 'json'
			}
		
		let useCaseStepTos = cowidget.common.NetXhr.request(xhrArgs).getResult();
		useCaseStepTos = useCaseStepTos.reverse();
		self.storage.setItem('MockService.UseCaseStep', JSON.stringify(useCaseStepTos));
	}
	
	popUseCaseStep() {
		let self = this;
		
		let useCaseStepTos = self.storage.getItem('MockService.UseCaseStep');
		
		useCaseStepTos = JSON.parse(useCaseStepTos);
	
		let retUseCaseStepTo = useCaseStepTos.pop();
		
		self.storage.setItem('MockService.UseCaseStep', JSON.stringify(useCaseStepTos));
		
		return retUseCaseStepTo;
	}
	
	/**
	 * @param useCaseTo: {
	 *            viewName: string, viewMethod: string, useCaseNum: number }
	 */
	setUseCaseStep(useCaseTo) {
		let useCaseStepKey = 'MockService.CaseStep';
		
		let userCase = self.storage.getItem(useCaseStepKey);
		
		self.storage.setItem(useCaseStepKey, JSON.stringify(useCase));
	}
	
	/**
	 * @param useCaseTo: {
	 *            viewName: string, viewMethod: string, useCaseNum: number }
	 */
	getUseCase(useCaseTo) {
		let self = this;
		
		useCaseTo = useCaseTo ? useCaseTo:{};
		
		MockService.LOG.debug('[getUseCase] useCaseTo: ', useCaseTo);
		
		//let useCase = self.useCaseStorage.get('MockService.' + useCaseTo.viewName);
		let useCase = self.storage.getItem('MockService.' + useCaseTo.viewName);
		useCase = JSON.parse(useCase);
		
		MockService.LOG.debug('[getUseCase] useCase: ', useCase);
		useCase = useCase[useCaseTo.viewMethod];
		MockService.LOG.debug('[getUseCase] useCase: ', useCase);
		
		MockService.LOG.debug('[getUseCase] storage item: ', JSON.parse(self.storage.getItem('MockService.' + useCaseTo.viewName)));
		
		return useCase[useCaseTo.useCaseNum+''];
	}
	
	
	resetUseCaseStep() {
		
	}
	
	/**
	 * @param useCaseStepTo {}
	 */
	getCaseStep() {
		
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
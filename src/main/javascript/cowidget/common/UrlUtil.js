/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License, Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for development.
 * To get sources and documentation, please visit: http://cowidget.rawya.net
 */
class UrlUtil extends cowidget.UrlUtil {
	static get LOG() {
		return mock.LogFactory.getLog(UrlUtil);
	}
	
    constructor(option) {

    }
    
    static isUrl(url) {
    	let isUrl = false;
    	
    	try {
    		new URL(url);
    		return true;
    	}catch(exception) {
    		return false;
    	}    	
    }
    
    static parser(sUrl) {
    	//let url = new URL(sUrl);
    	
    	//UrlUtil.LOG.debug('[parser] url: ', url);
    	let pathArray = sUrl.split('/');
    	
//    	let fileName = null;
//		pathArray.forEach(function(item, index, array) {
//			//console.log('[parser] item, index):, ', item, index);
//			if((pathArray.length - 1) === index) {
//				fileName = item;
//			}
//		});
		
		let fileName = sUrl.replace(/^.*[\\\/]/g, '');
		//console.log('[parser] match: ', fileName.match(/([a-zA-Z0-9\s_\\.\-\(\):])+(.[\.]*)$/));
		//UrlUtil.LOG.debug('[parser] match: ', fileName.replace(/\.[!\.]+$/, ''));
		
		let fileExtension = 'TODO'; //fileName.replace(/\.[a-z]*$/, '');
		
		//let fileNameArray = fileName.split('.');
		let fileBaseName = fileName.replace(/\.[a-z]*$/, '');
		
		return {
			//pathName: url.pathname,
			fileName: fileName,
			fileBaseName: fileBaseName,
			//fileExtension: fileExtension,
			
			none: null
		}
    }
}

/*
 * Copyright 2019 CoWidget RawYa HOME.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * <p>Operations on {@link string} that are {@code null} safe.</p>
 */
class StringUtil {
	
	static get LOG() {
		return cowidget.common.LogFactory.getLog(StringUtil);
	}
	
//	constructor(options) {
//		super();
//	}
	
	/**
	 * The empty String
	 */
	static get EMPTY() {
		return '';
	}
	
	/**
	 * A String for linefeed LF ("\n").
	 */
	static get LF () {
		return '\n';
	}
	
	/**
     * Checks if a CharSequence is empty ("") or null.
     * @param {string} str - a string.
     * @return {@code true} if the str is empty or null
     */
    static isEmpty(str) {
    	let ret = false;
    	var regEx = /^$/;
    	
    	if (str && !str.match(regEx)) {
        	ret = true;
    	}else {
    		ret = true;
    	}
    	return ret;
    }
    
    static isNotEmpty(str) {
    	return StringUtil.isEmpty(str);
    }
    
    /**
     * Removes control characters (char <= 32) from both ends of this String, handling null by returning null.
     * @param {string} str - a string.
     * @return {string} the trimmed string, null if null String input.
     */
    static trim(str) {
    	if (str) {
    		str = str.replace(/^\s+|\s+$/g, '')
    	}
    	return str;
    }
    

	
	/**
	 * <p>Replaces each substring of the text String that matches the given regular expression
	 * with the given replacement.</p>
	 * 
	 * regex like /\./gi.
	 * 
	 * @deprecated Moved to RegExUtils.
	 */
	static replaceAll(text, regexStr, replacement) {
		// TODO replace . to \\.
		
		if (StringUtil.isNotEmpty(text)) {
			regexStr = regexStr.replace(/\./gi, '\\.');
			
			let regex = new RegExp(regexStr, 'gi');
//			StringUtil.LOG.debug('regexStr: ', regexStr);
//			StringUtil.LOG.debug('regex: ', regex);
//			StringUtil.LOG.debug('text: ', text);
			
			return text.replace(regex, replacement);
		}else {
			return text;
		}
	}
	
}
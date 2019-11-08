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
 * <p>Helpers to process Strings using regular expressions.</p>
 * {@code null} safe.</p>
 */
class RegExUtil {
	
	static get LOG() {
		return cowidget.common.LogFactory.getLog(RegExUtil);
	}
	
	constructor(options) {
		super();
	}
	
	/**
	 * <p>Replaces each substring of the text String that matches the given regular expression pattern with the given replacement.</p>
	 * 
	 * @param text  text to search and replace in, may be null
	 * @param regex  the regular expression pattern to which this string is to be matched
	 * @param replacement  the string to be substituted for each match
	 * @return  the text with any replacements processed,
	 *              {@code null} if null String input
	 */
	static replaceAll(text, regex, replacement) {
		if (text == null || regex == null || replacement == null) {
			return text;
		}
		return regex.matcher(text).replaceAll(replacement);
	}
	
}
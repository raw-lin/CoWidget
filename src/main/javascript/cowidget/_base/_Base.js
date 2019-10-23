/*
 * Copyright 2019 CoWidget RawYa HOME. Licensed under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
class _Base {
	
	static get LOG() {
		return cowidget.common.LogFactory.getLog(_Base);
	}
	
	get LOG() {
		return this.constructor.LOG;
	}
	
	static get constructorOpts() {
		return {
			/* arg01 */ arg01: null,
			/* arg02 */ arg02: null,
			/* arg02 */ arg03: null
		}
	}
	
	get field() {
		if('undefined' === typeof this.field) {
			Object.assign(this, {
				field: '<default field value>'
			});
		}
		
		return this.field;
	}
	
	/**
	 * Create a point.
	 * 
	 * @param {number}
	 *            x - The x value.
	 * @param {number}
	 *            y - The y value.
	 */
	constructor(/**/options) {
        let self = this;
        options = options ? options : {};

        console.log('[_Base.constructor] self: ', self);
        console.log('[_Base.constructor] options: ', options);

        // self.adapter = new Objecy();
        self.metaData = option ? option : {};
    }
	
	/**
	 * Convert a string containing two comma-separated numbers into a point.
	 * 
	 * @param {string}
	 *            str - The string containing two comma-separated numbers.
	 * @return {Point} A Point object.
	 */
    static fork() {
        console.log('[_Base.foo] call');
    }

	/**
	 * TODO
	 */
	getBase() {
        var self = this;
        return self;
    }
	
	/**
	 * TODO Get the x value.
	 * 
	 * @return {number} The x value.
	 */
    getX() {
        // ...
    }
}

/*
 * CoWidget (c) Copyright 2019 RawYa HOME. Licensed under the Apache License,
 * Version >=2.0 - see LICENSE.
 * 
 * This is an optimized version of CoWidget, built for deployment and not for
 * development.
 */
/**
 * <p>
 * Date and time formatting utilities and constants.
 * </p>
 * 
 * @since 1.0
 */
class DateFormatUtil {
	static get LOG() {
		return cowidget.common.LogFactory.getLog(DateFormatUtil);
	}
	
	constructor(/* viewName: string, container: View Object */options) {
		new Error('failure constructor');
	}
	
	static perpare(oDate) {
		let ret = {
				fullYear : 0,
				month:0,
				day:0
		};
		
		ret.fullYear = (oDate.getFullYear() + '').padStart(4, '0');
		ret.month = (oDate.getMonth() + '').padStart(2, '0');
		ret.day = (oDate.getDay() + '').padStart(2, '0');
		
		return ret;
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
	static format(oDate, pattern) {
		pattern = pattern ? pattern:'yyyy/MM/dd';
		let formatTxt = null;
		
		DateFormatUtil.LOG.debug('oDate: ', oDate);
		DateFormatUtil.LOG.debug('pattern: ', pattern);
		
		DateFormatUtil.LOG.debug('oDate: ', oDate.getFullYear());
		DateFormatUtil.LOG.debug('oDate: ', oDate.getMonth());
		DateFormatUtil.LOG.debug('oDate: ', oDate.getDay());
		
		let fullYear = (oDate.getFullYear() + '').padStart(4, '0');
		let month = (oDate.getMonth() + '').padStart(2, '0');
		let day = (oDate.getDay() + '').padStart(2, '0');
		
		let hour = (oDate.getHours() + '').padStart(2, '0');
		let minute = (oDate.getMinutes() + '').padStart(2, '0');
		let second = (oDate.getSeconds() + '').padStart(2, '0');
		let millisecond = (oDate.getMilliseconds() + '').padStart(3, '0');
		
		let formatTT = pattern.replace('yyyy', '${fullYear}');
		formatTT = formatTT.replace('MM', '${month}');
		formatTT = formatTT.replace('dd', '${day}');
		formatTT = formatTT.replace('HH', '${hour}');
		formatTT = formatTT.replace('mm', '${second}');
		formatTT = formatTT.replace('ss', '${millisecond}');
		// formatTT = formatTT.replace('ZZ', '${millisecond}');
		
		if('undefined' === typeof pattern) {
			formatTxt = `${fullYear}/${month}/${day}`;
		}else if('yyyy-MM-dd' === pattern){
			formatTxt =  `${fullYear}-${month}-${day}`;
		}else if('yyyy/MM/dd' === pattern){
			formatTxt =  `${fullYear}/${month}/${day}`;
		}else if('yyyy.MM.dd' === pattern){
			formatTxt =  `${fullYear}.${month}.${day}`;
		}else if('yyyyMMdd' === pattern){
			formatTxt =  `${fullYear}${month}${day}`;
		}else{
			formatTxt = `${fullYear}/${month}/${day}`;
		}
		
		//DateFormatUtil.LOG.debug('[format] formatTT: ', formatTT);
		
		formatTxt = eval('`' + formatTT + '`');
		formatTxt = (new Function('fullYear', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', 'return `' + formatTT + '`;'))
							(fullYear, month, day, hour, minute, second, millisecond);
		
		return formatTxt;
	}
}

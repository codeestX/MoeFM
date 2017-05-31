/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

export default class DateUtil {
    /**
     * 时间戳转字符串
     * **/
    static parseTime2String(timestamp) {
        let newDate = new Date();
        newDate.setTime(timestamp * 1000);
        return newDate.toISOString().split('T')[0];
    }

    static parseSecond2String(secondValue) {
        let value = parseInt(secondValue);
        let min = parseInt(value / 60);
        let second = value - min * 60;
        if (second <= 9) {
            second = '0' + second;
        }
        return min + '.' + second;
    }

    static parseString2Second(str) {
        let min = parseInt(str.slice(1,2));
        let second = parseInt(str.slice(4,5));
        return min * 60 + second;
    }
}
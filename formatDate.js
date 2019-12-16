const MONTHS = [
  ['Jan', 'January'],
  ['Feb', 'February'],
  ['Mar', 'March'],
  ['Apr', 'April'],
  ['May', 'May'],
  ['Jun', 'June'],
  ['Jul', 'July'],
  ['Aug', 'August'],
  ['Sep', 'September'],
  ['Oct', 'October'],
  ['Nov', 'November'],
  ['Dec', 'December']
];
const WEEKS = [
  ['Sun', 'Sunday'],
  ['Mon', 'Monday'],
  ['Tue', 'Tuesday'],
  ['Wed', 'Wednesday'],
  ['Thu', 'Thursday'],
  ['Fri', 'Friday'],
  ['Sat', 'Saturday']
];

// 注意，要把长的放前面，表示优先匹配
const gre = /(?:yyyy|yy|mm|m|MM|M|dd|d|DD|Do|D|HH|H|hh|h|A|a|ii|i|ss|s|X|x)/g;

/**
 * 格式化日期
 *
 * @param  {Date}   [date]  要格式化的日期，如果不传则使用当前日期
 * @param  {String} format  格式字符串，支持如下格式（以 2014-01-02 04:05:06 为例）：
 *
 *  FORMAT  |       EXAMPLE
 *  --------|----------------
 *  yyyy    |       2014
 *  yy      |       14
 *  m, mm   |       1, 01
 *  M, MM   |       Jan, January
 *  d, dd   |       2, 02
 *  D, DD   |       Thur, Thursday
 *  Do      |       2nd（Day of month with ordinal: 1st..31st）
 *  H, HH   |       4, 04（24 hour time)
 *  h, hh   |       4, 04 (12 hour time used with `a A`)
 *  a, A    |       am, AM
 *  i, ii   |       5, 05
 *  s, ss   |       6, 06
 *  x       |       1388646306
 *  X       |       1388646306346
 *
 * @return {String}         格式化后的日期
 *
 * @example
 *
 * formatDate('yyyy-mm-dd HH:ii:ss')
 * // 2016-07-08 15:03:02
 * formatDate(new Date(), 'h:ii A')
 * // 8:30 AM
 *
 * @author Zhonglei Qiu
 * @since 2.0.0
 */
module.exports = function(_date, format) {
  if (!format || !_date) {
    return _date;
  }
  let date;
  if (_date instanceof Date) {
    date = _date;
  } else {
    date = new Date(_date);
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const week = date.getDay();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const h = hour % 12;
  const a = hour > 11 ? 'pm' : 'am';

  return format.replace(gre, function(key) {
    let result;
    switch (key) {
      case 'yyyy':
        result = year.toString();
        break;
      case 'yy':
        result = year.toString().substr(2);
        break;
      case 'mm':
        result = pad(month + 1);
        break;
      case 'm':
        result = String(month + 1);
        break;
      case 'MM':
        result = MONTHS[month][1];
        break;
      case 'M':
        result = MONTHS[month][0];
        break;
      case 'dd':
        result = pad(day);
        break;
      case 'd':
        result = String(day);
        break;
      case 'DD':
        result = WEEKS[week][1];
        break;
      case 'D':
        result = WEEKS[week][0];
        break;
      case 'Do':
        result = order(day);
        break;
      case 'HH':
        result = pad(hour);
        break;
      case 'H':
        result = String(hour);
        break;
      case 'hh':
        result = pad(h);
        break;
      case 'h':
        result = String(h);
        break;
      case 'a':
        result = String(a);
        break;
      case 'A':
        result = a.toUpperCase();
        break;
      case 'ii':
        result = pad(minute);
        break;
      case 'i':
        result = String(minute);
        break;
      case 'ss':
        result = pad(second);
        break;
      case 's':
        result = String(second);
        break;
      case 'x':
        result = String(Math.round(date.getTime() / 1000));
        break;
      case 'X':
        result = String(date.getTime());
        break;
      /* istanbul ignore next 正则是精确匹配，不可能出现下面情况 */
      default:
        result = String(key);
        break;
    }
    return result;
  });
};

function pad(num) {
  return num < 10 ? '0' + num : `${num}`;
}

function order(day) {
  const prefix = day.toString();
  let suffix = 'th';
  const map = { '1': 'st', '2': 'nd', '3': 'rd' };

  if (day < 4 || day > 20) {
    suffix = map[prefix.toString().slice(-1)] || 'th';
  }

  return prefix + suffix;
}

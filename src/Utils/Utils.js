export function mul(a, b) {
   var c = 0,
      d = a.toString(),
      e = b.toString();

   c += d.split(".")[1]?.length ?? 0;
   c += e.split(".")[1]?.length ?? 0;

   return (Number(d.replace(".", "")) * Number(e.replace(".", ""))) / Math.pow(10, c);
}

/**
 * 日期或时间格式化
 * @param {string} fmt 日期或时间格式
 * @param {Date | string | number} date Date对象或日期时间字符串
 * @returns 格式化后的日期或时间字符串
 */
export function dateTimeFormat(datetime, fmt = "yyyy-MM-dd HH:mm:ss") {
   const date = new Date(datetime);

   const o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
   };

   if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
   }

   for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
         fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k].toString() : ("00" + o[k].toString()).substr(o[k].toString().length));
      }
   }

   return fmt;
}

/**
 * 全日期时间简单格式化，只能自定义日期的连接字符，默认为‘-’
 * @param { Date | string | number} date Date对象或日期时间字符串
 * @returns 格式化后的全日期时间字符串
 */
export function sampleFormat(datetime, separator = "-") {
   const date = new Date(datetime);

   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const day = date.getDate();
   const hour = date.getHours();
   const minute = date.getMinutes();
   const second = date.getSeconds();
   const formatNumber = (n) => (n.toString()[1] ? n : "0" + n);

   return [year, month, day].map(formatNumber).join(separator) + " " + [hour, minute, second].map(formatNumber).join(":");
}

export function debounce(func, delay) {
  // 防抖：X秒调用就会把上一次操作取消 循环 直到X秒没有被再次调用就会执行
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt) {
  // 1.获取年份-> y+ : 1个或多个y
  if (/(y+)/.test(fmt)) {
    // 第一个参数:从第几位开始截取,第二个参数是截取多少个字符,返回截取的字符串
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // 如果fmt中为'm'，则直接用str替换，得到如'4'、'10'之类的结果
      // 如果fmt中为'mm'，则str左边补零后替换，得到如'04'、'10'之类的结果
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


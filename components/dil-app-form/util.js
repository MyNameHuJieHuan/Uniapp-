// 这里添加规则
// zh:中文，phone手机，email邮箱, idCard身份证验证，无算法验证
// rexType:'phone',
export const refObject = {
	zh: /^[\u4e00-\u9fa5]+$/,//中文
	en: /^[a-zA-Z]+$/,//英文
	number: /^[0-9]+$/,//整数
	password: /^(?![0-9]+$)(?![a-zA-Z\.!@#$%^&*()_+|{}?><\-\]\\[\/'"\:\;\,\<\>]+$)[0-9A-Za-z\.!@#$%^&*()_+|{}?><\-\]\\[\/'"\:\;\,\<\>]{6,20}$/,//密码数字加特殊字符
	phone: /^1[3456789]\d{9}$/,// 中国手机号验证
	email: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,// 邮箱验证
	// idCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
}
export const refArr = Object.keys(refObject)



export const  isArray=(o)=>{
	return Object.prototype.toString.call(o)== '[object Array]';

}

/**
 * 获取某年某月有多少天
 */
export const getOneMonthDays = (year,month)=>{
	month = Number(month);
	const baseMonthsDays = [31,28,31,30,31,30,31,31,30,31,30,31];
	if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)){
		if(month === 1){
			baseMonthsDays[month] = 29;
		}
	}
	return baseMonthsDays[month];
}

/**
 * 获取日期的年月日时分秒
 */
export const getTimeArray = (date)=>{
	const year = date.getFullYear();
	const month = date.getMonth()+1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year,month,day,hour,minute,second];
}
/**
 * 小于10的数字前面补0
 */
export const addZero = (num)=>{
	return num < 10 ? '0' + num : num;
}

/**
 * 获取当前值在数组中的索引
 */
export const getIndexOfArray = (value,array)=>{
	let index = array.findIndex(item => item == value);
	return index > -1 ? index : 0;
}
export const yearDiff=(startTime,endTime)=>{
  let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
  let start = new Date(startTime);
  let end = new Date(endTime);
  let year = end.getFullYear() - start.getFullYear();
  let month = end.getMonth() - start.getMonth();
  let day = end.getDate() - start.getDate();
  if (month < 0) {
    year--;
    month = end.getMonth() + (12 - start.getMonth());
  }
  if (day < 0) {
    if (month==0) {
      year--;
      month=11
    }else{
      month--
    }
    let index = flag.findIndex((temp) => {
      return temp === start.getMonth() + 1
    });
    let monthLength;
    if (index <= 6) {
      monthLength = 31;
    } else if (index > 6 && index <= 10) {
      monthLength = 30;
    } else {
      monthLength = 28;
    }
    day = end.getDate() + (monthLength - start.getDate());
  }
  // console.log(`相差${year}年${month}月${day}天`)
  return {
    year,
    month,
    day
  }
}
// 返回变量属性，或者是否属于某个属性
export function backType(cc, string) {
  var typeName = Object.prototype.toString.call(cc);
  if (typeName == '[object Object]') {
    typeName = '[object ' + cc.constructor.name;
  }
  typeName = typeName.replace(']', '').slice(8);
  if (string) {
    return typeName == string;
  }
  return typeName;
}


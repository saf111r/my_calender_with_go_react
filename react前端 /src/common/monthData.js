
import LunarCalender from './solar2Lunar.js';
/*
根据给定的年 月 返回 对应月的视图,包含农历 节日等
*/
export default class MonthData {
    constructor(year, month) {
        this.year = year;
        this.month = month;
    }
    // 根据年 月 获取当月天数
    // 根据year和month得到新的date对象, 参数0,表示上个月的最后一天
    // 由于Date是从0开始计算月份,所以,这样实际就返回了对应月的最后一天
    // 再结合getDate就可以返回当前月的天数

    // 例如:new Date(2014,2,0).getDate();     //返回2014年2月份的最后一天(28)
    // 当第三个参数为0的时候，其实是返回上一个月的最后一天 
    // (注意月份的数字2实际上是三月份，故而代码是返回2月份的最后一天在当月中的序号)。
    // getDate用于返回Date对象一个月的某一天
    getMonthDays=() => {

        const temp = new Date(this.year, this.month + 1, 0);
        return temp.getDate();


    }
    // 获得指定年月的1号在星期几,并返回一个填充数据(用于占位)
    getFillDatas=() => {
        const dt = new Date(this.year, this.month, 1);
        //填充数据,用于填充每个月前几个空白星期
        let fillDatas = [];
        // getDay()返回某一天是星期几(0-6)
        const weekdays = dt.getDay();

        // 一个月的第一天是星期几,null表示空,用于占位
        for (let i = 0; i < weekdays; i++) {
            fillDatas[i] = {
                "solar": "",
                "lunar": ""
            };

        }
        return fillDatas;
    }
    // 获得 一个月的农历和日历数据 并返回一个
    getFullMonthDatas=() => {
        // fillDatas 表示填充每个月前的空星期
        let fullMonthDatas = [];
        const totalDays = this.getMonthDays();
        // 当前日期,用于高亮显示
        // 阳历转农历对象
        const lunarData = new LunarCalender();

        // 当前月总天数,根据年份 月份 日期,生成对应的农历.并将农历和国历存为一个二维数组
        for (let i = 0; i < totalDays; i++) {
            let tempDateObject = lunarData.solar2lunar(this.year, this.month + 1, i + 1);
            fullMonthDatas[i] = {
                "solar": i + 1,
                "lunar": tempDateObject.isTerm === false ? tempDateObject.day : tempDateObject.Term,
            };

        }
        return fullMonthDatas;
    }

}
/*
接受年月日,视图类型,然后返回 下一个 年/月/日
*/
export default class getNewDate {
    constructor({year, month, day, viewType}) {
        this.newYear = year;
        this.newMonth = month;
        this.newDay = day;
        this.viewType = viewType;

    }
    // 返回上一个年/月/日
    handleLeftClick=() => {
        switch (this.viewType) {
        case "yearView":
            this.newYear--;
            break;
        case "monthView":
            this.newMonth--;
            if (this.newMonth < 0) {
                this.newYear--;
                this.newMonth = 11;
            }
            break;
        case "dayView":
            this.newDay--;
            if (this.newDay < 1) {
                this.newMonth--;
                if (this.newMonth < 0) {
                    this.newYear--;
                    this.newMonth = 11;
                }
                this.newDay = new Date(this.newYear, this.newMonth + 1, 0).getDate();
            }
            break;
        default:
        
        }
         // 未处理超过1900-2100年范围的时候.
        // 调用回调函数,通知父组件更新状态
        return {
            year: this.newYear,
            month: this.newMonth,
            day: this.newDay,
            viewType: this.viewType
        }
    }
    // 返回下一年/月/日
    handleRightClick=() => {
        switch (this.viewType) {
        case "yearView":
            this.newYear++;
            break;
        case "monthView":
            this.newMonth++;
            if (this.newMonth > 11) {
                this.newYear++;
                this.newMonth = 0;
            }
            break;
        case "dayView":
            this.newDay++;
            if (this.newDay > (new Date(this.newYear, this.newMonth + 1, 0).getDate())) {
                this.newMonth++;
                if (this.newMonth > 11) {
                    this.newYear++;
                    this.newMonth = 0;
                }
                this.newDay = 1;
            }
            break;
        default:
        }
        return {
            year: this.newYear,
            month: this.newMonth,
            day: this.newDay,
            viewType: this.viewType
        }

    } 
    // 返回今天
    handleTodyClick=() => {
        const currentDate = new Date();
        this.newYear = currentDate.getFullYear();
        this.newMonth = currentDate.getMonth();
        this.newDay = currentDate.getDate();
        return {
            year: this.newYear,
            month: this.newMonth,
            day: this.newDay,
            viewType: this.viewType
        }

    }
}
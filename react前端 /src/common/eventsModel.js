import { host } from './config.js'

// 接收参数 ,向服务器api发送请求,返回json数据
export const getUrl = ({year, month, day, viewType, method}) => {
    let url;
    switch (viewType) {
    case "monthView":
        url = host + "/api/events/" + viewType + "/" + year + "/" + (month + 1);
        break;
    case "dayView":
        url = host + "/api/events/" + viewType + "/" + year + "/" + (month + 1) + "/" + day;
        break;
    default:
        console.log(viewType);

    }
    return url;


}
export const getOptions = () => {
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return options;
}
// export const addEvent = ({year, month, day, hours, viewType}) => {
//     // 
//     const url = host + "/api/events/" + viewType + "/" + year + "/" + (month + 1) + "/" + day
//     fetch(url, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json'
//         },


//     })
//         .then((response) => response.json())
//         .then((json) => {
//             this.setState({
//                 year: year,
//                 month: month,
//                 day: day,
//                 event: json['all']
//             });
//             console.log(url);
//             console.log(this.state.event)
//         });

// }

// export const editEvent = ({year, month, day, hours, viewType}) => {
//     // 
//     const url = "http://localhost:8080/api/events/" + viewType + "/" + year + "/" + (month + 1) + "/" + day
//     fetch(url, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json'
//         },


//     })
//         .then((response) => response.json())
//         .then((json) => {
//             this.setState({
//                 year: year,
//                 month: month,
//                 day: day,
//                 event: json['all']
//             });
//             console.log(url);
//             console.log(this.state.event)
//         });

// }

// export const deleteEvent = ({year, month, day, hours, viewType}) => {
//     // 
//     const url = "http://localhost:8080/api/events/" + viewType + "/" + year + "/" + (month + 1) + "/" + day
//     fetch(url, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json'
//         },


//     })
//         .then((response) => response.json())
//         .then((json) => {
//             this.setState({
//                 year: year,
//                 month: month,
//                 day: day,
//                 event: json['all']
//             });
//             console.log(url);
//             console.log(this.state.event)
//         });

// }


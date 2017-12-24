import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './basecss.css';
/* 作者:木秋
 * 2017年11月30日正式开始项目的搭建,2017年12月16日,开始代码重构,写第二版
 *优化之前的代码结构
 * 采用golang作为后端语言负责提供数据的API接口,react做前端交互,用浏览器端渲染的方式
 */
// 项目的入口文件
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

## 本项目使用golang react mongodb 搭建的一个仿google Calender的web应用。
这是我第一次劫接触这几种技术，通过这个项目，自己对这几种技术有了一个基本的认识。当然项目中还存在许多不足，比如：未设置路由处理，用户验证等。

### 开发时长
* 2017年10月17日开始学习知识
* 2017年11月30日开始正式搭建项目
* 2017年12月16日基本完成第一版的构建
* 2017年12月24日完成代码的优化,调整,第二版完成
### 使用的开发工具
* Deepin Linux(深度操作系统 www.deepin.org)
* sublime text 3 (还有一系列插件 https://www.sublimetext.com/3)
* chrome (React Developer tools)
### 使用技术栈
* golang
* React
* node(作为安装扩展包和开发运行的环境)
* creat-react-app(脚手架)

### 项目安装
* 先git clone 到本地
* 安装node
* 配置api数据库相关信息,编译服务器端(golang)
* cd 到前端目录
* 安装依赖包,(node_modules)
* npm start 运行项目.
* 

### 依赖react第三方库
* react-bootstrap
* 

### 默认配置
* 数据库 127.0.0.1:27107
* api服务器 127.0.0.1:8080
* 前端开发服务器(express) 127.0.0.1:3000
* 

### 已知bug
* 月视图添加事件选择日期的时候,状态不能及时更新,要点两次才能返回上一次的状态(原因还的去分析一下 react组件的更新细节)

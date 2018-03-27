# React全家桶完成的基本增删改查管理系统 

## 服务器搭建  
json-server  
首先执行npm i json-server -g把json-server作为全局工具安装   
新建一个项目目录（后面文中所有的路径根目录都表示该项目目录）  
在根目录中执行npm init初始化一个npm项目（会有一些项目配置需要你输入，一直敲回车就行了）  
npm i react react-dom react-router --save 安装基本的react依赖  
/public目录里存放项目的静态文件，图片等   
/src/index.js是应用入口文件   
/src/index.html是页面的入口文件   
/server目录用于放置服务端的文件   
/server/db.json文件作为服务端的数据库文件   
在/server/db.json文件中写入以下数据：  

## 文件命名
[模块][功能].xxx，  
上面是一个添加用户的页面，所以模块是User，功能是Add，良好的命名风格可以让你的项目、代码更容易维护  
（这里由于是React的一个组件，所以使用大写开头的大驼峰命名法）


## 路由
Q: 为什么我看到的url里有一个’#’？    
A: 这是由于我们给Router组件传入了hashHistory，url中’#’及’#’以后的部分属于hash，hash的变化并不会引起页面的重新刷新，而hashHistory会监听hash的变化使得Router组件能够根据url渲染出正确的组件。除了hash History之外还有browserHistory和memoryHistory。使用browserHistory可以让url变得像标准的url一样（没有#），但是需要在后端做一些特殊处理；memoryHistory是用于做服务端渲染时使用的。  


Q: 为什么Home.js里要用Link组件而不是一个标准的a标签？   
A: 上面说了，我们使用了hashHistory，正确的页面url中应该都是有一个’#’的，如果直接使用a标签，你需要这么写：<a href=”/#/user/add”>添加用户</a>。但是如果我们想要换成browserHistory，就需要把所有标签中的’#’去掉。使用react-router提供的Link组件可以让我们无视history之间的差异性，直接写标准的路由”/user/add”就可以了。此外，由于我们写的是单页面应用（SPA），Link组件会阻止页面的跳转（仅仅只是改变了url，然后改变了渲染的组件）。  

##其他模块  

var koa = require('koa');
var app = koa();
var router = require('koa-router');
var onerror = require('koa-onerror');
// 配置文件
var config = require('./config/config');
// debug 工具
var debug = require('debug')('book');
// 日志记录
var Logger = require('mini-logger');

var logger = Logger({
	dir: config.logDir,
	categories: ['router', 'model', 'controller'],
	format: 'YYYY-MM-DD-[{category}][.log]'
});

// 记录 Error 实例
var pageView = 0;
logger.error(new Error('test'));

app.use(function *(next){
	// config 注入中间件，方便调用配置信息
	if(!this.config){
		this.config = config;
		console.log(config);
	}
	yield next;
});

app.use(router(app));

// 路由中获取配置
app.get('/config', function *(){
	var config = this.config;
	debug('env: %s', config.env);
	this.body = config.env;
	logger.router('Page view: ' + ++pageView);
});

// 新建 /api/user/:id 路由，返回一个用户信息
app.get('/api/user/:id', function *(){
	var user = {name:'minghe', email:'minghe36@gmail.com'};
	user = JSON.stringify(user);
	this.body = user;
});

// xtemplate 模板引擎对koa对适配
var xtpl = require('xtpl/lib/koa');
// xtemplate 模板渲染
xtpl(app, {
	// 配置模板目录，指向工程的view目录
	views: config.viewDir
});

app.get('/view-test', function *(){
	yield this.render('test', {"title": "xtemplate demo"});
});


onerror(app);

// app.get('/', function *(){
// 	// 我是首页
// 	// this 指向请求
// 	this.body = "hello world";
// 	//console.log(this);
// 	console.log(this.response);
// 	console.log(this.response.body === this.body);
// });

// app.param('id', function *(id, next){
// 	this.id = Number(id);
// 	if(typeof this.id != 'number') return this.status = 404;
// 	yield next;
// }).get('/detail/:id', function *(next){
// 	// 我是详情页
// 	var id = this.id;
// 	this.body = id;
// });

app.on('error', function(err, ctx){
	if(process.env.NODE_ENV != 'test'){
		console.log(err.message);
		console.log(err);
	}
});




app.listen(3000);

module.exports = app;


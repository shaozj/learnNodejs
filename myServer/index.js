/*
* 基于Node.js的web应用
* 功能：
* 1、用户可以通过浏览器使用我们的应用
* 2、当用户请求http://domain/start时，能够看到一个欢迎页面，
*    页面上有一个文件上传的表单
* 3、用户可以选择一个图片并提交表单，随后文件将被上传到
*    http://domain/upload，该页面完成上传后会把图片显示在页面上。
*/

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
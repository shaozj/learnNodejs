/*
* 静态文件合并服务器
* 支持 http://assets.example.com/foo/??bar.js,baz.js 格式
* 的JS或CSS文件合并请求
*
*
* 1、分析URL，得到请求文件路径和类型（MIME）
* 2、读取请求文件，按顺序合并文件内容
* 3、服务器返回响应，完成对一次请求的处理
*
* 改进，一边读取文件一边输出响应
* 解决问题：
* 1、当请求的文件比较多比较大时，串行读取文件会比较耗时，从而拉长服务端
*    响应等待时间。
* 2、由于每次响应输出的数据都需要先完整地缓存在内存中，当服务器请求并发
*    数较大时，会有较大的内存开销。
* 
*/

var fs = require('fs'),
	path = require('path'),
	http = require('http');

var MIME = {
	'.css': 'text/css',
	'.js': 'aplication/javascript'
};

function main(argv){
	var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
		root = config.root || '.',
		port = config.port || 80,
		server;

	server = http.createServer(function(request, response){
		var urlInfo = parseURL(root, request.url);

		validateFiles(urlInfo.pathnames, function(err, pathnames){
			if(err){
				response.writeHead(404);
				response.end(err.message);
			}else{
				response.writeHead(200, {
					'Content-Type' : urlInfo.mime
				});
				outputFiles(pathnames, response);
			}
		});
	}).listen(port);

	process.on('SIGTERM', function(){
		server.close(function(){
			process.exit(0);
		});
	});
}

function parseURL(root, url){
	var base, pathnames, parts;

	if(url.indexOf('??') === -1){
		url = url.replace('/', '/??');
	}

	parts = url.split('??');
	base = parts[0];
	pathnames = parts[1].split(',').map(function(value){
		console.log(path.join(root, base, value));
		return path.join(root, base, value);
	});

	return{
		mime: MIME[path.extname(pathnames[0])] || 'text/plain',
		pathnames: pathnames
	};
}

function outputFiles(pathnames, writer){
	(function next(i, len){
		if(i < len){
			var reader = fs.createReadStream(pathnames[i]);

			reader.pipe(writer, {end: false});
			reader.on('end', function(){
				next(i + 1, len);
			});
		}else{
			writer.end();
		}
	})(0, pathnames.length);
}

function validateFiles(pathnames, callback){
	(function next(i, len){
		if(i < len){
			fs.stat(pathnames[i], function(err, stats){
				if(err){
					callback(err);
				}else if(!stats.isFile()){
					callback(new Error());
				}else {
					next(i + 1, len);
				}
			});
		}else{
			callback(null, pathnames);
		}
	})(0, pathnames.length);
}

main(process.argv.slice(2));

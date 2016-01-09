/*
* 请求处理模块
*/

var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

var count = 0;
function start(response, postData){
	count ++;
	console.log("Request handler 'start' was called.");
	console.log("count: " + count);

	var body = '<html>'
				+ '<head>'
				+ 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
				+ '</head>'
				+ '<body>'
				+ 	'<form action="/upload" enctype="multipart/form-data" method="post">'
				+ 		'<input type="file" name="upload">'
				+ 		'<input type="submit" value="Upload file" />'
				+	'</form>'
				+ '</body>'
				+ '</html>'

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request){
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files){
		console.log("parsing done");
		console.log(files.upload.path);
		fs.renameSync(files.upload.path, "C:\\Users\\ZHENJI~1.SZJ\\AppData\\Local\\Temp\\test.png");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image: <br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response){
	console.log("Request handler 'show' was called.");
	fs.readFile("C:\\Users\\ZHENJI~1.SZJ\\AppData\\Local\\Temp\\test.png", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;

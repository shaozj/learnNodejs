// 一个最简单的co实现

function co(fn){
	return function(done){
		var ctx = this;
		console.log(this);
		var gen = fn.call(ctx);
		var it = null;
		function _next(err, res){
			if(err) res = err;
			it = gen.next(res);
			if(!it.done){
				it.value(_next);
			}
		}
		_next();
	}
}

var fs = require('fs');
// 一个thunk函数
function read(file){
	return function(fn){
		fs.readFile(file, 'utf8', fn);
	}
}

co(function *(){
	var c = 2;
	console.log(c);
	var a = yield read('error.js');
	console.log(a.length);

	var b = yield read('package.json');
	console.log(b.length);
})();
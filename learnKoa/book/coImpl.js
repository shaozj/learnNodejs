// 一个最简单的co实现

// 判断是否是generator function
function isGeneratorFunction(obj){
	var constructor = obj.constructor;
	if(!constructor) return false;
	if('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName)
		return true;
	return isGenerator(constructor.prototype);
}

// 判断是否是generator对象
function isGenerator(obj){
	return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

function co(fn){
	return function(done){
		var ctx = this;
		var gen = fn.call(ctx);
		var it = null;
		function _next(err, res){
			if(err) res = err;
			it = gen.next(res);
			if(!it.done){
				if(isGeneratorFunction(it.value)){
					co(it.value).call(ctx, _next);
				}else{
					it.value(_next);
				}
			}else{
				done && done.call(ctx);
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

function *gf1(){
	this.a = yield read('app.js');
}

function *gf2(){
	this.b = yield read('package.json');
}

co(function *(){
	yield gf1;
	yield gf2;
	console.log(this.a.length);
	console.log(this.b.length);
})();



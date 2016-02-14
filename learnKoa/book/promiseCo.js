// 将所有的yieldable都转成promise
function toPromise(obj){
	if(!obj) return obj;
	if(isPromise(obj)) return obj;
	// thunk 偏函数转成 promise
	if('function' == typeof obj) return chunkToPromise.call(this, obj);
	// 如果是generator function或generator对象，调用此co执行此遍历器逻辑
	if(isGeneratorFunction(obj) || isGenerator(obj))
		return co.call(this, obj);
	return obj;
}

// 判断是否是promise
function isPromise(obj){
	return 'function' == typeof(obj.then);
}

// thunk 偏函数转成 promise
function thunkToPromise(fn){
	var ctx = this;
	return new Promise(function(resolve, reject){
		fn.call(ctx, function(err, res){
			if(err) return reject(err);
			if(arguments.length > 2) res = slice.call(arguments, 1);
			resolve(res);
		});
	});
}

// co 返回promise，这样可以支持多个co点链式调用
 function co(gen){
 	var ctx = this;
 	if(typeof gen === 'function')
 		gen = gen.call(this);

 	return new Promise(function(resolve, reject){
 		// 执行遍历器
 		onFulfilled();

 		function onFulfilled(res){
 			var ret;
 			try{
 				// 执行遍历器逻辑
 				ret = gen.next(res);
 			}catch(e){
 				return reject(e);
 			}
 			next(ret);
 		}

 		function next(ret){
 			// done 为 true，执行完成
 			if(ret.done) return resolve(ret.value);
 			// 将yieldable转成promise实例
 			var value = toPromise.call(ctx, ret.value);
 			// yieldable 执行完成后，调用 onFulfilled()，执行下一个 next()
 			if(value && isPromise(value))
 				return value.then(onFulfilled, onRejected);
 			return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        			+ 'but the following object was passed: "' + String(ret.value) + '"'));
 		}

 		// 出现 error 执行 reject()
 		function onRejected(err){
 			var ret;
 			try{
 				ret = gen.throw(err);
 			}catch(e){
 				return reject(e);
 			}
 			next(ret);
 		}
 
 	})
 }













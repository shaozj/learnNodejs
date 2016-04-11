var co = require('co');
var fs = require('fs');

function read(file) {
	console.log('aaaa');
  return function(fn){
    fs.readFile(file, 'utf8', fn);
  }
}

//console.log('bbbb');

co(function *(){
  var a = yield read('app.js');
  console.log(a.length);

  var b = yield read('package.json');
  console.log(b.length);
})();
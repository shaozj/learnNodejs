var co = require('co');
var fs = require('fs');

function read(file) {
	conosle.log('aaaa')
  return function(fn){
    fs.readFile(file, 'utf8', fn);
  }
}

console.log('bbbb')

co(function *(){
  // var a = yield read('.gitignore');
  // console.log(a.length);
  console.log('ccccc')

  var b = yield read('package.json');
  console.log(b.length);
});
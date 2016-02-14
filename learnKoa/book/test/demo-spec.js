var assert = require('assert');

describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when value is not present', function(){
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});

// mocha 异步测试
var fs = require('fs');
var should = require('should');
describe('fs', function(){
	describe('#readFile()', function(){
		it('should not be null', function(done){
			fs.readFile('./package.json', 'utf8', function(err, res){
				if(err) throw err;
				res.should.not.equal(null);
				done();
			});
		});
	});
});

// superTest 请求测试
var superagent = require('supertest');
var app = require('../demo');

function request(){
	return superagent(app.listen());
}

describe('Routes', function(){
	describe('GET /', function(){
		it('should be json', function(done){
			request()
			.get('/api/user/1')
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				var text = res.text;
				var json = JSON.parse(text);
				json.should.have.property('email');
				json.should.have.property('name');
				done();
			});
		});
	});
});





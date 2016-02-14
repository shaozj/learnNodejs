/*global describe, it*/
'use strict';
var superagent = require('supertest');
var app = require('../app');

function request() {
    return superagent(app.listen());
}

describe('Routes', function () {
    describe('GET /', function () {
        it('should return 200', function (done) {
            request()
                .get('/')
                .expect(200, done);
        });
    });
});

var should = require('should');
describe('Should test', function(){
	it('number', function(){
		(123).should.be.a.Number;
	});
	it('object prototype', function(){
		var obj = {name:'minghe', email:'minghe36@gmail.com'};
		obj.should.have.property('name', 'minghe');
		obj.should.have.property('email');
	});
});


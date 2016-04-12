/**
 * Created by shaozj on 16/4/11.
 */
var co = require('co')
var os = require('os')
var fs = require('fs')
var path = require('path')
var http = require('http')

var request = require('..')

var tmpdir = os.tmpdir()
var uri = 'https://raw.github.com/component/domify/84b1917ea5a9451f5add48c5f61e477f2788532b/component.json'
var redirect = 'https://raw.github.com/jonathanong/inherits/master/component.json'

describe('cogent', function () {
  it('should work with HTTPS', co(function* () {
    var res = yield* request(uri, true);
    console.log(res.statusCode);
    console.log(res.body);
    res.statusCode.should.equal(200);
    res.headers['content-encoding'].should.equal('gzip');
    res.resume();
  }))
})


/**

*将html中的css和js引用combo成一个或几个引用

*author: lanqin

*zhenjiang.szj@alibaba-inc.com

*2015.8.27

**/

var fs = require('fs');
var readline = require('readline');

if(process.argv.length<3 || !fs.existsSync(process.argv[2])){
    console.log('命令格式：node readline.js filepath，缺少filepath或文件路径不存在\n')
    process.exit(0);
}

var filePath = '';

var rlp = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

setKeyword();

var oriPath, newPath, noCombo;
var fileNum = 0;

// 设置关键字
function setKeyword(){
    if(!process.env.keyword){
        rlp.prompt();
        rlp.question('请输原始路径,新路径以及不combo的项，用逗号隔开?\n', function(answer) {
            process.env.keyword = answer;
            var inputs = answer.split(',');
            if(inputs[0]) oriPath = inputs[0].split(' ');
            if(inputs[1]) newPath = inputs[1].split(' ');
            if(inputs[2]) noCombo = inputs[2].split(' ');

            console.log(oriPath);
            console.log(newPath);
            console.log(noCombo);
            filePath = process.argv[2];
            fileProcess();
        });
    }   
}

var matchLines = new Array();


//在文件中查找JS链接内容并替换
function searchJs(filePath, data){
    var oLen = oriPath.length;
    var nLen = newPath.length;
    var regExps = new Array(oLen);
    var results = new Array(nLen);
    var map = new Array(nLen);

    // init
    var lastIndex = 0;
    for(var i = 0; i < oLen; i++){
        var tmp = oriPath[i].replace(/\//g, "\\\/"); 
        var str = "/<script[^>]+src=\""+tmp+"\\w*.js\"><\\\/script>/g";
        var regExp = eval(str);
        //console.log("reg Expression: " + regExp + "-----------");
        regExps[i] = regExp;

        if(newPath[i] != '?'){
            lastIndex = i;
        }else{
            map[i] = lastIndex;
        }
    }

    for(var i = 0; i < nLen; i++){
        results[i] = ""; 
    }

    var mRes;
    var index;
    for(var i = 0; i < oLen; i++){
        if(mRes = data.match(regExps[i])){
            for(var j = 0; j < mRes.length; j++){
                //console.log("mRes["+j+"] = " + mRes[j] + "&&&&&&&&&&&");
                matchLines.push(mRes[j]);

                if(newPath[i] == '?'){
                    index = map[i];
                }else{
                    index = i;
                }

                var newPathParts = newPath[index].split("??");

                if(results[index] == ""){
                    results[index] = mRes[j].replace(oriPath[i], newPath[index]);
                    //console.log("results[" +index + "] = " + results[index]);
                }else{
                    var subRegExp = /\/\w*.js"><\/script>/;
                    var fp = (mRes[j].match(subRegExp))[0];

                    if(newPathParts[1]){
                        fp = fp.replace(/\//, "");
                        fp = ',' + newPathParts[1] + fp;
                    }
                    else{
                        fp = fp.replace(/\//, ",");
                    }

                    results[index] = results[index].replace(/\"><\/script>/, fp);
                    //console.log("results[" +index + "] = " + results[index]);
                }
            }  
        }
        if(i == oLen - 1){ // 最后一行
            modiFile(filePath, results);
        }
    }

}

//在文件中查找CSS链接内容并替换
function searchCss(filePath, data){
    var oLen = oriPath.length;
    var nLen = newPath.length;
    var regExps = new Array(oLen);
    var results = new Array(nLen);
    var map = new Array(nLen);

    // init
    var lastIndex = 0;
    for(var i = 0; i < oLen; i++){
        var tmp = oriPath[i].replace(/\//g, "\\\/"); 
        var str = "/<script[^>]+src=\""+tmp+"\\w*.js\"><\\\/script>/g";
        var regExp = eval(str);
        //console.log("reg Expression: " + regExp + "-----------");
        regExps[i] = regExp;

        if(newPath[i] != '?'){
            lastIndex = i;
        }else{
            map[i] = lastIndex;
        }
    }

    for(var i = 0; i < nLen; i++){
        results[i] = ""; 
    }

    var mRes;
    var index;
    for(var i = 0; i < oLen; i++){
        if(mRes = data.match(regExps[i])){
            for(var j = 0; j < mRes.length; j++){
                //console.log("mRes["+j+"] = " + mRes[j] + "&&&&&&&&&&&");
                matchLines.push(mRes[j]);

                if(newPath[i] == '?'){
                    index = map[i];
                }else{
                    index = i;
                }

                var newPathParts = newPath[index].split("??");

                if(results[index] == ""){
                    results[index] = mRes[j].replace(oriPath[i], newPath[index]);
                    //console.log("results[" +index + "] = " + results[index]);
                }else{
                    var subRegExp = /\/\w*.js"><\/script>/;
                    var fp = (mRes[j].match(subRegExp))[0];
                    if(newPathParts[1])
                        fp = ',' + newPathParts[1] + fp;
                    else
                        fp = fp.replace(/\//, ",");
                    results[index] = results[index].replace(/\"><\/script>/, fp);
                    //console.log("results[" +index + "] = " + results[index]);
                }
            }  
        }
        if(i == oLen - 1){ // 最后一行
            modiFile(filePath, results);
        }
    }

}

//退出或查找新内容
function continueOrExit() {
    rlp.prompt();
    rlp.question('输入e退出，输入n查找新内容?\n', function(answer) {
        if(answer.match(/^e?$/i))
        {
            console.log('谢谢使用，再见〜〜〜!');
            process.exit(0);
        }else if(answer.match(/^n?$/i)){
            delete process.env.keyword;
            setKeyword();
        }else{
            continueOrExit();
        }
    });
}

function File () {
    var index = 0;
    // 对一个文件进行处理
    var _readFile = function (pathStr, fileBack, doneBack) {
        fs.readFile(pathStr,{encoding:'utf8'}, function (err, data) {
            index--;
            if (err) {
                data = "";
                console.log(err,pathStr)
                //throw err;
            }
            searchJs(pathStr, data);
            //searchCss(pathStr, data);
            console.log('\none file parsed. ***********************++++++++++++++++++\n');
            fileBack(data, pathStr);
            if (index == 0) {
                doneBack();
            }
        });
    };
    // 处理指定路径下的所有html文件
    var _walkDir = function (pathStr, fileBack, doneBack) {
        fs.readdir(pathStr, function (err, files) {
            files.forEach(function (file) {
                if(fs.statSync(pathStr + '/' + file).isDirectory()){
                    _walkDir(pathStr + '/' + file, fileBack, doneBack);
                } else {
                    if (/.html$/.test(file)){
                        index ++;
                        fileNum ++;
                        _readFile(pathStr + '/' + file, fileBack, doneBack);
                    }
                    return;
                }
            });
        });
    }

    this.walkDir = function (pathStr, fileBack, doneBack) {
        index = 0;
        _walkDir(pathStr, fileBack, doneBack);
    }
}

function fileProcess(){
    new File().walkDir(filePath, function (data) {
        if (!!data) {
            var match = data.match(/[\u4e00-\u9faf]+/g);
            if (!!match) {
                match.forEach(function (mat) {
                    //dictionary.set(mat);
                })
            }
        }
    }, function () {
        console.log('文件遍历 OK');
    })
}

// 修改内容写入文件
function modiFile(filePath, results){
    var newRef = "";
    for(var i = 0; i <results.length; i++){
        newRef += results[i] + "\n";
    }

    fs.readFile(filePath, {encoding:'utf8'}, function (err, data) {
        if (err) {
            data = "";
            console.log(err, filePath)
        }
        var newData = data.replace(matchLines[0], newRef);
        for(var i = 1; i < matchLines.length; i++){
            newData = newData.replace(matchLines[i], "");
        }
        //console.log(newData);
        fs.writeFile(filePath, newData, function (err) {
            if (err) throw err;
            if(fileNum == 0){
                process.exit(0);
            }      
        }); 
        console.log('替换 OK');
        fileNum --;
    });
}

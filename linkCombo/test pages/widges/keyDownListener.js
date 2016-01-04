/**

*可以处理按键事件是为长按键事件的组件

*author: lanqin

*zhenjiang.szj@alibaba-inc.com

*2015.7.10

**/
;(function() {
	'use strict';
	var timer;
	var isKeyUp = true;
	var keydownTime = 0;
	var keydownCount = 0;
	var lastKeyCode;
	// 判断是否为长按键事件，如果是的话，处理长按键事件
    window.checkLongClick = function(eventEmitter, key){
        var data = new Date();
        var curTime = data.getTime();
        var deltaTime = curTime - keydownTime;  // deltaTime为长按按键不放的时间
        if(!isKeyUp && deltaTime >= 350){  // 时间有误差，设为350，比400要小，防止手柄不能触发长按事件
            timer = setTimeout(eventEmitter, 80, key, true);
        }
    }
	window.keyDownListener = function(eventEmitter){
	    // 监听keyup事件
	    document.body.addEventListener('keyup', function (e) {
	        clearTimeout(timer);
	        isKeyUp = true;
	        keydownCount = 0;
	    })
	    // 监听keydown事件
	    document.body.addEventListener('keydown', function (e) {
	        keydownCount ++;
	        var key = e.keyCode;
	        lastKeyCode = key;
	        if(keydownCount == 1){  // 防止遥控器自身在长按时多次调用下面的函数
	            isKeyUp = false;
	            var data = new Date();
	            keydownTime = data.getTime();
	            eventEmitter(key, false);
	            if(key >= 37 && key <= 40){  // 只对上下左右键判断是否为长按键事件
	            	setTimeout(checkLongClick, 400, eventEmitter, key);  // 400ms后判断一下是否为长按按键事件
	            }
	        }
	    });
	}

})();
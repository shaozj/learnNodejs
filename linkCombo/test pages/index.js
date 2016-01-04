/**

*电视水电煤首页

*author: lanqin

*zhenjiang.szj@alibaba-inc.com

*2015.7.9

**/

"use strict"
var winWidth = screen.width;
if(winWidth<=1280){
    document.querySelector("body").style.backgroundImage='url(/img/720p/coal-bg.png)';
}
else{
    document.querySelector("body").style.backgroundImage='url(/img/1080p/coal-bg.png)';
}

(function($){
    topTime.startTime("J_time");
    loadItems(10);
    function loadItems(num){
        var itemList = $(".itemList");
        for(var i = 0; i < num; i++){
            var tmp = i;
            if(tmp > 3) tmp = 3;

            var item = document.createElement('div');
            item.className = "item";
            item.id = "item" + i;
            if(i == 0){
                item.className = "item first active";
            }
            itemList[0].appendChild(item);
            var picture = document.createElement('img');
            if(winWidth <= 1280){
                picture.src = "../img/720p/card_0"+ (tmp + 1) + ".png";
            }else{
                picture.src = "../img/1080p/card_0"+ (tmp + 1) + ".png";
            }
            item.appendChild(picture);
            var bottomWords = document.createElement('span');
            bottomWords.innerHTML = "我要缴费";
            item.appendChild(bottomWords);
            var mask = document.createElement('div');
            mask.className = "mask";
            item.appendChild(mask);
        }
    }

    var ITEM_WIDRH = 360;
    var ITEM_MARFIN = 60;
    var MOVE_STEP = ITEM_WIDRH + ITEM_MARFIN;

    var ipre = -1;  // the index of previous item
    var iNow = 0;  // the index of current item
    var dir; // 0 : left, 1 : right
    var aLi= $(".item");
    var liLength = aLi.length;
    var isFocusUp = false;

    // 焦点框对象
    var focus = $(".itemList").Focus({
        ofocus : $("#focus"),           // 外焦点框
        iFocus : $("#innerFocus"),      // 内焦点框
        index : 0,                      // 焦点框初始位置
        duration : 0.2,                 // 焦点框动画时间
        stride : MOVE_STEP,             // 焦点框每次移动距离
        transitionType : 'ease',        // 过渡类型
        callback : function(){}         // 回调函数
    });

    // 按键发射事件
    function eventEmitter(key, isLongClick){
        if(!isFocusUp){
            if(key==37){  // left
                ipre = iNow;
                iNow--;
                if(iNow < 0){
                    iNow = 0;
                    return ;
                }
                dir = 0;
            }else if(key==39){  // right
                ipre = iNow;
                iNow++;
                if(iNow > liLength - 1){
                    iNow = liLength - 1;
                    return;
                }
                dir = 1;
            }else if(key==38){  // up
                focus.moveFocusUp(iNow, dir);
                isFocusUp = 1;
                return;
            }else{
                return;
            }
        }else{  // 焦点框在上面,
            if(key==40){  // down,
                focus.moveFocusDown(iNow, dir);
                isFocusUp = 0;
                return;
            }else{
                return;
            }
        }
        
        focus.setFocusPos(iNow, dir);
        focus.toActive(ipre,iNow,function(){
            $("#item"+ipre.toString()+" span").css({
                    'opacity' : '0'
                });
            $("#item"+iNow.toString()+" span").css({
                    'opacity' : '1'
                });
        });
        if(isLongClick){
            checkLongClick(eventEmitter, key);
        }
    }
    // 监听按键事件，能处理长按键事件
    keyDownListener(eventEmitter);

})(Zepto);

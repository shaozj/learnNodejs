 $(document).ready(function(){
    var aLi;
    var iNow = 0;
    var isUp = 0;
    var dir; // 0 : left, 1 : right
    var itemList = $(".itemList");
    var winWidth = window.screen.width;

    if(winWidth <= 1280){
        var bd = $("body");
        bd.css({
            'background-image': 'url(../img/720p/coal-bg.png)'
        })
    }else{
        var bd = $("body");
        bd.css({
            'background-image': 'url(../img/1080p/coal-bg.png)'
        })
    }

    var loadItems = function(num){
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
            }else if(winWidth <= 1920){
                picture.src = "../img/1080p/card_0"+ (tmp + 1) + ".png";
            }
            item.appendChild(picture);
            var bottomWords = document.createElement('span');
            bottomWords.innerHTML = "我要缴费";
            item.appendChild(bottomWords);
        }
    }
    var toActive = function (num) {
        aLi = $(".item");
        for (var i = 0, l = aLi.length; i < l; i++) {
            var curItem = $('#item'+i);
            var curSpan = $('#item'+i+' span');
            if (num == i) {
                curSpan.css({
                    'opacity' : '1'
                });
                curItem.css({
                    'transition' : 'transform 0.2s ease',
                    'transform': 'scale(1.05)'
                });
            }else {
                curSpan.css({
                    'opacity' : '0'
                });
                curItem.css({
                    'transition' : 'transform 0.2s ease',
                    'transform': 'scale(1)'
                });
            }
        }
    }
    // 焦点框的初始位置
    var initFocusPos = function(num){
        var curItem = $('#item'+num);
        var ofocus = $("#focus");
        var innerFocus = $("#innerFocus");
        innerFocus.css({
            'width': '378px',
            'height': '504px'
        });
        ofocus.css({
            'top': curItem.offset().top - 0.025 * curItem.height() -6-2 + 'px',
            'left': curItem.offset().left - 0.025 * curItem.width() -6-2 + 'px',
            'width': '382px',
            'height': '508px'
        });
    }
    // 移动焦点框以及图像区域
    // 420 框横向移动的距离
    // 210 做居中处理时需要的一个偏移量
    var setFocusPos = function(num, dir){
        var curItem = $('#item'+num);
        var ofocus = $("#focus");
        var result = 420 * num+'px,0,0';
        var len = aLi.length;
        var duration = 0.2;
        if(aLi.length <= 4 || num == 0 || (num == 1 && dir == 1)){ // 屏幕只有4个块，或者当前块为第一个块，或者当前块为第二个块，且向右滑动
            ofocus.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+result+')'
            });
        }else if(num == 1 && dir == 0){  // 向左滑到第二个块，从居中逻辑恢复到排列四个块
            result = 420 * num +'px,0,0';
            ofocus.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+result+')'
            });
            var picContainer = $(".itemList");
            var dist = -420 * (num-2) -420 +'px,0,0';
            picContainer.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+dist+')'
            });
        }else if(num == 2){ // 滑到第三个块，居中处理，需要调整焦点框移动距离以及图片widget的移动距离
            result = 420 * num - 210+'px,0,0';
            ofocus.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+result+')'
            });
            var picContainer = $(".itemList");
            var dist = -420 * (num-2) - 210+'px,0,0';
            picContainer.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+dist+')'
            });
        }else if(num == len - 2 && dir == 1){  // 向右滑动到倒数第二个块
            result = 420 * (4-(len - num)) +'px,0,0';
            ofocus.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+result+')'
            });
            var picContainer = $(".itemList");
            var dist = -420 * (num-2) +'px,0,0';
            picContainer.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+dist+')'
            });
        }else if(num == len - 1 || (num == len - 2 && dir == 0)){ // 只移动焦点框
            result = 420 * (4-(len - num)) +'px,0,0';
            ofocus.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+result+')'
            });
        }else if(num == len - 3 && dir == 0){ // 向左滑到倒数第三个块，居中处理
            result = 420 * 2 - 210 +'px,0,0';
            ofocus.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+result+')'
            });
            var picContainer = $(".itemList");
            var dist = -420 * (num-2) - 210+'px,0,0';
            picContainer.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+dist+')'
            });
        }else{ // 此时只移动图片widget，不移动焦点框，焦点框居中
            result = 420 * 2 - 210 +'px,0,0';
            ofocus.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+result+')'
            });
            var picContainer = $(".itemList");
            var dist = -420 * (num-2)- 210+'px,0,0';
            picContainer.css({
                'transition' : 'transform '+duration+'s ease',
                'transform' : 'translate3d('+dist+')'
            });
        }
    }
    // 焦点框往上移动时，左上角点移动到的位置相对于初始左上角点的偏移（-21，-228, 0）
    var moveFocusUp = function(){
        var ofocus = $("#focus");
        var innerFocus = $("#innerFocus");
        var dist = -21 + 'px, ' + (-228) + 'px, 0';
        var curItem = $('#item'+iNow);
        var editImg = $("#edit img");
        curItem.css({
            'transition' : 'all 0.2s ease',
            'transform': 'scale(1)'
        });
        innerFocus.css({
            'transition' : 'all 0.2s ease',
            'width': '158px',
            'height': '60px',
            'opacity': '0'
        });
        ofocus.css({
            'transition' : 'all 0.2s ease',
            'transform' : 'translate3d('+ dist + ')',
            'width': '162px',
            'height': '64px',
            'opacity': '0'
        });
        editImg.css({
            'transition' : 'all 0.2s ease',
            'background-color': '#eb7413'
        });
    }
    // 
    var moveFocusDown = function(num, dir){
        var ofocus = $("#focus");
        var innerFocus = $("#innerFocus");
        var editImg = $("#edit img");
        toActive(num);
        ofocus.css({
            'transition' : 'all 0.2s ease',
            'width': '382px',
            'height': '508px',
            'opacity': '1'
        });
        innerFocus.css({
            'transition' : 'all 0.2s ease',
            'width': '378px',
            'height': '504px',
            'opacity': '1'
        });
        editImg.css({
            'transition' : 'all 0.2s ease',
            'background-color': 'rgba(0,0,0,0.0)'
        });
        setFocusPos(num, dir);
    }
    // 绑定按键
    document.body.addEventListener('keydown', function (e) {
        var ofocus = $("#focus");
        var innerFocus = $("#innerFocus");
        var key = e.keyCode;
        if(!isUp){
            switch(key){
            case 37:  // left
                iNow--;
                if(iNow < 0){
                    iNow = 0;
                    break;
                }
                dir = 0;
                toActive(iNow);
                setFocusPos(iNow, dir);
                break;
            case 38:  // up
                moveFocusUp();
                isUp = 1;
                break;
            case 39:  // right
                iNow++;
                if(iNow > aLi.length - 1){
                    iNow = aLi.length - 1;
                    break;
                }
                dir = 1;
                toActive(iNow);
                setFocusPos(iNow, dir);
                break;
            case 40:  // down
            default:
                break;
            }
        }else{
            switch(key){
            case 40:  // down
                moveFocusDown(iNow, dir);
                isUp = 0;
                break;
            case 37:
            case 38:
            case 39:
            default:
                break;
            }
        }
    });
    loadItems(10);
    initFocusPos(0);
    toActive(0);
})
function startTime()
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById("time").innerHTML=h+":"+m;
    t = setTimeout('startTime()', 3000)
}
function checkTime(i)
{
    if (i<10) {i="0" + i}
    return i
}
startTime();



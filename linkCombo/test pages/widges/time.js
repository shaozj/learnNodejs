"use strict";
var topTime = {
  startTime:function(obj_id){
    var self = this;
    var t = new Date();
    var h = self.checkTime(t.getHours());
    var m = self.checkTime(t.getMinutes());
    document.getElementById(obj_id).innerHTML=h+":"+m;
    setTimeout('topTime.startTime("'+obj_id+'")', 3000);
  },
  checkTime:function(val)
  {
      return val < 10 ? '0' + val : '' + val;
  }
}

function nodelistToarr(attr){
    var anchors = document.querySelectorAll(attr);
    // 将 nodeList 转为普通数组
    Array.prototype.slice.call(anchors);
    return anchors
}

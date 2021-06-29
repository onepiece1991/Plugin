/**
 * @Author: JXX
 * @Time: 2021/1/14
 * @Description: count down js
 */

var defaultTimeH = 17,
    defaultTimeM = 0;
getNewTime()
setInterval(function(){
  getNewTime()
},10000)

// 初始化
function initTime(h, m) {
  var myDate = new Date();
  var myHour = myDate.getHours();
  var myMinute = myDate.getMinutes();
  if((myHour > h) || (myHour == h && myMinute >= m)) {
    $('#minP').text('你已经下班了！！！下班不积极，脑瓜有问题！哼~');
    $('#minP').addClass('error');
  } else {
    $('#minP').removeClass('error');
    var timeS;
    if(m - myMinute < 0) {
      timeS = (parseInt(h) - myHour - 1)*60 + (parseInt(m) + 60 - myMinute);
    } else {
      timeS = (parseInt(h) - myHour)*60 + (parseInt(m) - myMinute);
    }
    $('#min').text(timeS);
  }
}

// 更新时间
function getNewTime() {
  var strT = $('#tInput').val();
  if(strT.trim() != ''){
    var stArr = strT.split(':');
    if(stArr.length != 2) {
      alert('请按照正确的格式输入')
      $('#tInput').val('17:00');
    } else {
      var newH = stArr[0];
      var newM = stArr[1];
      initTime(newH,newM)
    }
  } else {
    initTime(defaultTimeH,defaultTimeM)
  }
}
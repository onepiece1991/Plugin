/**
 * @Author: JXX
 * @Time: 2021/1/15
 * @Description: dormancy time js
 */
// getNewTime()
setInterval(function(){
  getNewTime()
},1000)
// 初始化
function initTime(old_time) {
  var myDate = new Date();
  var myYear = myDate.getFullYear();
  var myMonth = myDate.getMonth() + 1;
  var myDay = myDate.getDate();
  var myHour = myDate.getHours();
  var myMinute = myDate.getMinutes();
  var mySeconds = myDate.getSeconds();
  
  var now_time = Date.parse(new Date()); // 当前时间的时间戳
  var prev_time = Date.parse(new Date(old_time))
  
  if (prev_time>now_time) {
    //  你醒着的
    $('#minP').html('你醒着的!!!')
  }else {
    // 计算相差天数
    var time_dis = (now_time - prev_time)/1000; // 相差的总秒数
    var days = Math.floor(time_dis/(24*3600));
    // 计算相差小时数
    var rest1 = time_dis%(24*3600); // 计算天数后剩余的秒数
    var hours = Math.floor(rest1/3600);
    // 计算相差分钟数
    var rest2 = rest1%3600 // 计算小时数后剩余的秒数
    var minutes = Math.floor(rest2/60);
    // 计算相差秒数
    var rest3 = rest2%60; // 计算分钟数后剩余的秒数
    $('#minP').html("休眠时间：" + days + "天" + hours + "小时" + minutes + "分" + rest3 + "秒");
  }
}

// 更新时间
function getNewTime() {
  var valY = $('#year').val();
  var valMM = $('#month').val();
  var valD = $('#day').val();
  var valH = $('#hour').val();
  var valM = $('#minute').val();
  var endOldTime = valY + '-' + standardNum(valMM) + '-' + standardNum(valD) + ' ' + standardNum(valH) + ':' + standardNum(valM) + ':' + '00';
  initTime(endOldTime)
}

function standardNum(n) {
  return ('00' + n).slice(-2);
}
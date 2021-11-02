/**
 * @Author: Jinxx
 * @Time: 2021/10/29
 * @Description: calendar javascript
 */
var signData = {
  signDays: ["2021-1-1", "2021-1-24", "2021-1-25", "2021-1-26", "2021-1-27", "2021-1-28", "2021-1-29", "2021-1-30",
  "2021-4-4", "2021-4-5", "2021-4-6",
  "2021-5-1", "2021-5-2", "2021-5-3", "2021-5-4", "2021-5-5",
  "2021-6-25", "2021-6-26", "2021-6-27",
  "2021-10-1", "2021-10-2", "2021-10-3", "2021-10-4", "2021-10-5", "2021-10-6", "2021-10-7", "2021-10-8"]
}
calendar.initCalendar(signData)

// 显示弹框
function showWidge() {
  $('#jfSign').show();
  $('#maskWhite').show();
}
//隐藏弹框
function hideWidge() {
  $('#jfSign').hide();
  $('#maskWhite').hide();
}


// 马上签到
function signNow(obj) {
  $(obj).removeAttr('onclick');
  $(obj).html('已签到');
  $(obj).addClass('disabled');
  calendar.addItemClassname(calendar.withClass('calendar-table-today'), 'calendar-table-selected');
  var currentDate = calendar.currYear() + '-' + calendar.currMonth() + '-' + calendar.currDate();
  calendar.handleSignDays.push(currentDate);
  calendar.storeData(signData);
  calendar.initCalendar(signData)
  $('#jfSignNo').text(signData.signDays.length)  // 更新连续签到天数
}

// 页面跳转
function gpFn(url) {
  window.location.replace(url)
}

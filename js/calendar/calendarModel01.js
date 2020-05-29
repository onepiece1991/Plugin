/**
 * @Author: JXX
 * @Time: 2020/5/25
 * @Description: calendar javascript
 * 
 * 加载日历
 * 1、signData: 为每个账户最终的工作日（weekdays）和休息日（weekends）数据集合，如果不传入就会使用默认每年国家规定节假日及调休来修改对应的日历样式
 *              默认已经传入2020年的法定节假日及调休安排
 * 2、initCalendar: 将新规定的数据传入日历中
 */
var signData = {
    weekdays: ["2020-1-19","2020-2-1","2020-4-26","2020-5-9","2020-6-28","2020-9-27","2020-10-10"],
    weekends: ["2020-1-1","2020-1-24","2020-1-25","2020-1-26","2020-1-27","2020-1-28","2020-1-29","2020-1-30","2020-1-31","2020-2-1","2020-2-2",
"2020-4-4","2020-4-5","2020-4-6",
"2020-5-1","2020-5-2","2020-5-3",
"2020-6-25","2020-6-26","2020-6-27",
"2020-10-1","2020-10-2","2020-10-3","2020-10-4","2020-10-5","2020-10-6","2020-10-7","2020-10-8"]
}
calendar.initCalendar(signData)

/**
 * 点击页面保存修改按钮
 * 1、获取操作后的日期
 * workArr:最终存放将节假日改为工作日的日期，type: Array
 * restArr:最终存放将工作日改为节假日的日期，type: Array
 * 2、显示弹框
 */
function saveChange(){
  var workArr = calendar.sortDateArray(calendar.returnHandleWorkData());
  var restArr = calendar.sortDateArray(calendar.returnHandleRestData());
  var str = '';
  if(workArr.length != 0 || restArr.length != 0) {
    str += '您确定将';
  } else {
    str += '请选择要修改的日期！'
  }
  if(workArr.length != 0) {
    for(var i = 0; i < workArr.length; i++) {
      calendar.dateFormat(workArr[i]);
      if(i == workArr.length -1) {
        str += calendar.dateFormat(workArr[i]);
      } else {
        str += calendar.dateFormat(workArr[i]) + "、";
      }
    }
    if(restArr.length != 0) {
      str += '的节假日改为工作日，'
    } else {
      str += '的节假日改为工作日吗?';
    }
  }
  if(restArr.length != 0) {
    for(var i = 0; i < restArr.length; i++) {
      calendar.dateFormat(restArr[i]);
      if(i == restArr.length -1) {
        str += calendar.dateFormat(restArr[i]);
      } else {
        str += calendar.dateFormat(restArr[i]) + "、";
      }
    }
    str += '的工作日改为节假日吗?';
  }
  showWidge();
  calendar.withID('popupInfo').innerHTML = str;
}

/**
 * 点击弹框中确定按钮
 */
function makeSure(){
  calendar.storeData(signData); // 存储数据
  hideWidge(); // 隐藏弹框
}

// 显示弹框
function showWidge() {
  calendar.withClass('popup-box').style.display = 'block';
  calendar.withClass('mask').style.display = 'block';
}
//隐藏弹框
function hideWidge() {
  calendar.withClass('popup-box').style.display = 'none';
  calendar.withClass('mask').style.display = 'none';
}

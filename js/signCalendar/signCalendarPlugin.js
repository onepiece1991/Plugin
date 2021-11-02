/**
 * @Author: Jinxx
 * @Time: 2020/5/25
 * @Description: calendar javascript
 */

// 标记当前一年(2020年)的所有法定节假日及调休日
var signObjAll = {
  signDays: []
}
var calendar = {
  //当前时间
  nowTime: new Date(),
  // 当前年份
  // currYear: calendar.nowTime.getFullYear(),
  currYear: function() {
    return calendar.nowTime.getFullYear();
  },
  // // 当前月份
  currMonth: function() {
    return calendar.nowTime.getMonth() + 1;
  },
  // 当前日
  currDate: function() {
    return calendar.nowTime.getDate();
  },
  holidays: ['假期安排', '元旦', '除夕', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节'],
  // 日期外框
  calendarContainer: function() {
    var calendarWrapper = calendar.withID("calendarWrapper");
    if (calendarWrapper != "" && calendarWrapper != null && calendarWrapper != 'undefined') {
      calendarWrapper.parentNode.removeChild(calendarWrapper);
    }
    var cM = calendar.currMonth();
    var cY = calendar.currYear();
    var str = '<div class="calendar-select-box">' +
      '<div class="calendar-year-box"></div>' +
      '<div class="calendar-month-box">' +
      '<button class="calender-month-prev"></button>' +
      '<button class="calender-month-next"></button>' +
      '<div id="monthBtnGroup">';
    if (cM < 10) {
      str += '<div class="dropdown-btn" id="selectedMonth" data-value="' + cM + '">' + cY + '年0' + cM + '月</div>';
    } else {
      str += '<div class="dropdown-btn" id="selectedMonth" data-value="' + cM + '">' + cY + '年' + cM + '月</div>';
    }
    str += '</div>' +
      '<div class="month-dropmenu" id="monthDropMenu" style="display: none;">' +
      '<div class="month-wrapper">' +
      '<p class="current-year" data-value="' + cY + '" id="currentYearDrop">' + cY + '年</p>' +
      '<div class="month-main">' +
      '<ul class="month-box" id="monthBox"></ul>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
      // +'<button class="calendar-backtotoday">返回今天</button>'
      // +'<button class="calendar-reset">重置</button>'
      +
      '</div>' +
      '<div class="calendar-table-wrapper">' +
      '<table class="calendar-table-box" cellspacing="0" cellpadding="0">' +
      '<thead>' +
      '<tr>' +
      '<th>日</th>' +
      '<th>一</th>' +
      '<th>二</th>' +
      '<th>三</th>' +
      '<th>四</th>' +
      '<th>五</th>' +
      '<th>六</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody class="calendar-tbody">' +
      '</tbody>' +
      '</table>' +
      '</div>';
    var rootEle = calendar.withID("signCalendarBox");
    var div = calendar.newElement("div");
    div.innerHTML = str;
    div.setAttribute("class", "calendar-wrapper");
    div.setAttribute("id", "calendarWrapper");
    rootEle.appendChild(div);
  },
  /**
   * 创建年份下拉,并给对应事件
   * 选择则对应的table日期也将改变,且已选中日期会跳到当前选择月的日期，然后给右边明细栏赋值
   */
  createSelectYear: function() {
    var cY = calendar.currYear();
    var strY = ''
      +'<div class="year-btn-group" id="yearBtnGroup">'
      +'<div class="dropdown-btn align-l" id="selectedYear" data-value="' + cY + '">' + cY + '年</div>'
      +'<i class="arrow-down"></i>'
      +'</div>'
      +'<div class="year-dropmenu" id="yearDropMenu" style="display: none;">'
      +'<ul class="dropdown-menu-box" id="yearMenuBox">'
      +'</ul>'
      +'</div>'
      +'</div>';
    calendar.withClass("calendar-year-box").innerHTML = strY;
    //填充下拉框中的年份
    var yearBox = calendar.withID('yearMenuBox');
    //总年数
    var lenY = 20;
    for (var i = 0; i <= 20; i++) {
      var li = calendar.newElement('li');
      li.className = 'dropdown-item';
      li.setAttribute('data-value', (cY - 10 + i));
      li.innerText = (cY - 10 + i) + '年';
      //给li添加点击事件
      li.onclick = function() {
        var selectyear = calendar.withID("selectedYear");
        var year = this.getAttribute('data-value');
        var month = calendar.withID("selectedMonth").getAttribute('data-value');
        selectyear.innerHTML = year + '年';
        selectyear.setAttribute('data-value', year);
        if(month < 10) {
          calendar.withID("selectedMonth").innerHTML = year + '年0' + month + '月';
        } else {
          calendar.withID("selectedMonth").innerHTML = year + '年' + month + '月';
        }
        calendar.createMonthBox(year);
        
        yearMenu.style.display = 'none';
        calendar.createTabledate(year, month);
        //切换时是否会遇到假期安排的时间selectedDate
        if (calendar.isSelectedDate(selectedDate)) {
          calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
        } else {
          calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
        }
      }
      yearBox.appendChild(li);
    }

    //点击年份下拉框
    var yearBtn = calendar.withID('yearBtnGroup');
    var yearMenu = calendar.withID('yearDropMenu');
    yearBtn.onclick = function() {
      var ymd = yearMenu.style.display;
      calendar.hideDropdown('month-dropmenu');
      if (ymd == 'none') {
        yearMenu.style.display = 'block';
      } else {
        yearMenu.style.display = 'none';
      }
    }
  },
  /**
   * @param year 传入当前选中的是哪一年
   */
  createMonthSelect: function(year) {
    var monthBox = calendar.withID("monthBox");
    if (monthBox != "" && monthBox != null && monthBox != 'undefined') {
      monthBox.parentNode.removeChild(monthBox);
    }
    var monthBox = calendar.newElement("ul");
    monthBox.setAttribute("class", "month-box");
    monthBox.setAttribute("id", "monthBox");
    var monthMain = calendar.withClass('month-main');
    monthMain.appendChild(monthBox);

    //当前年份
    var currentYear = calendar.withID('selectedYear').getAttribute('data-value');
    //当前年份
    var currentMonth = calendar.withID('selectedMonth').getAttribute('data-value');
    //去年最后两个月

    for (var j = 11; j <= 12; j++) {
      var prevLi = calendar.newElement("li")
      prevLi.className = 'other-month';
      prevLi.setAttribute('data-value', parseInt(year) - 1 + '-' + j);
      prevLi.innerText = parseInt(year) - 1 + '年' + j + '月';
      monthBox.appendChild(prevLi);
    }

    //当前年
    for (var i = 1; i <= 12; i++) {
      var li = calendar.newElement("li")
      if (i == currentMonth) {
        li.className = 'current-month';
      } else {
        li.className = '';
      }
      if (i < 10) {
        li.setAttribute('data-value', parseInt(year) + '-0' + i);
        li.innerText = parseInt(year) + '年0' + i + '月';
      } else {
        li.setAttribute('data-value', parseInt(year) + '-' + i);
        li.innerText = parseInt(year) + '年' + i + '月';
      }
      monthBox.appendChild(li);
    }

    //明年头两个月
    for (var k = 1; k <= 2; k++) {
      var nextLi = calendar.newElement("li")
      nextLi.className = 'other-month';
      nextLi.setAttribute('data-value', parseInt(year) + 1 + '-0' + k);
      nextLi.innerText = parseInt(year) + 1 + '年0' + k + '月';
      monthBox.appendChild(nextLi);
    }

    var liArr = document.getElementById("monthBox").childNodes;
    for (var n = 0; n < liArr.length; n++) {
      if (liArr[n].className.indexOf("other-month") > -1) {
        //上一年
        liArr[n].onclick = function() {
          var selectmonth = calendar.withID("selectedMonth");
          var monthOther = this.getAttribute("data-value");
          var monthOtherArr = monthOther.split("-");
          selectmonth.innerHTML = monthOtherArr[0] + '年' + monthOtherArr[1] + '月';
          selectmonth.setAttribute('data-value', parseInt(monthOtherArr[1], 10))

          //月份时间表重新加载
          calendar.createMonthBox(monthOtherArr[0]);

          // monthMenu.style.display = 'none';
          calendar.createTabledate(monthOtherArr[0], parseInt(monthOtherArr[1], 10));
          //切换时是否会遇到假期安排的时间selectedDate
          if (calendar.isSelectedDate(selectedDate)) {
            calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          } else {
            calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          }
        }
      } else {
        liArr[n].onclick = function() {
          var selectmonth = calendar.withID("selectedMonth");
          var month = this.getAttribute('data-value');
          var monthArr = month.split("-");
          selectmonth.innerHTML = monthArr[0] + '年' + monthArr[1] + '月';
          selectmonth.setAttribute('data-value', parseInt(monthArr[1], 10))
          // monthMenu.style.display = 'none';
          calendar.createTabledate(monthArr[0], parseInt(monthArr[1], 10));

          //切换时是否会遇到假期安排的时间selectedDate
          if (calendar.isSelectedDate(selectedDate)) {
            calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          } else {
            calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          }
        }
      }
    }

  },
  //根据年，月，用table绘制日历。 年月变动则 重新绘制
  createTabledate: function(year, month) {
    var calendar_tbody = calendar.withClass("calendar-tbody");
    if (calendar_tbody != "" && calendar_tbody != null && calendar_tbody != 'undefined') {
      calendar_tbody.parentNode.removeChild(calendar_tbody);
    }
    var calendar_body = calendar.newElement('tbody');
    calendar_body.setAttribute("class", "calendar-tbody");
    var calendarTable = calendar.withClass('calendar-table-box');
    calendarTable.appendChild(calendar_body);
    // month去0
    month = parseInt(month, 10);
    //先得到当前月第一天是星期几,然后根据这个星期算前面几天的上个月最后几天.
    var fixedDate = calendar.setdateinfo(year, month, 1);
    //当前月第一天星期几,星期一到星期日的值分别是1-2-3-4-5-6-0
    var firstDay = fixedDate.getDay();
    //上个月的最后一天是星期几
    var pervLastDay;
    if (firstDay != 0) {
      pervLastDay = firstDay - 1;
    } else {
      pervLastDay = 6;
    }
    //得到上个月最后一天;
    var pervMonthlastDay = calendar.getPervMonthLastDay(year, month);
    //上月最后几天循环
    var lastdays = pervMonthlastDay - pervLastDay;
    var tr = calendar.newElement('tr');
    if (firstDay != 0) {
      for (var i = lastdays; i <= pervMonthlastDay; i++) {
        var td = calendar.newElement('td');
        var tdDiv = calendar.newElement('div');
        tdDiv.className = 'calendar-relative';
        td.appendChild(tdDiv);
        var a = calendar.getA(parseInt(month, 10) - 1 == 0 ? parseInt(year) - 1 : year, parseInt(month, 10) - 1 == 0 ? 12 :
          parseInt(month, 10) - 1, i);
        //上个月最后几天的样式
        a.className = 'calendar-table-other-month';
        tdDiv.appendChild(a);
        tr.appendChild(td);
      }
    }
    //这个月开始的循环
    //这个月startDays的取值 7-6-5-4-3-2-1
    var startDays = ((7 - firstDay) == 7 ? 7 : (7 - firstDay));
    for (var i = 1; i <= startDays; i++) {
      var td = calendar.newElement("td");
      var tdDiv = calendar.newElement('div');
      tdDiv.className = 'calendar-relative';
      td.appendChild(tdDiv);
      var b = calendar.getA(year, month, i);
      tdDiv.appendChild(b);
      tr.appendChild(td);
    }
    calendar_body.appendChild(tr);
    //指定年月最后一天
    var currMonthLashDay = calendar.getCurrMonthLashDay(year, month);
    //当月除开第一行的起点
    var currmonthStartDay = startDays;
    //当月还剩余的天数
    var restDays = currMonthLashDay - startDays;
    //循环次数
    var loopT = 0;
    if (calendar.check(restDays / 7)) {
      //是小数
      loopT = Math.ceil(restDays / 7); //向上取整
    } else {
      loopT = restDays / 7;
    }

    //这是下个月开始的变量;
    var lastFirstDay = 1;
    for (var i = 0; i < loopT; i++) {
      var tr1 = calendar.newElement('tr');
      for (var n = 1; n <= 7; n++) {
        var td = calendar.newElement('td');
        var tdDiv = calendar.newElement('div');
        tdDiv.className = 'calendar-relative';
        td.appendChild(tdDiv);

        if (startDays == 0) {
          //下个月
          var c = calendar.getA(parseInt(month, 10) + 1 == parseInt(13) ? parseInt(year) + 1 : year, parseInt(month, 10) +
            1 == parseInt(13) ? 1 : parseInt(month, 10) + 1, lastFirstDay);
          //下个月最后几天的样式
          c.className = 'calendar-table-other-month';
          tdDiv.appendChild(c);
          lastFirstDay++;
          tr1.appendChild(td);
          continue;
        } else {
          startDays++;
          var d = calendar.getA(year, month, startDays);
          tdDiv.appendChild(d);
          if (startDays == currMonthLashDay) {
            //下个月
            startDays = 0;
          }
          tr1.appendChild(td);
        }

      }
      calendar_body.appendChild(tr1);
    }
    // calendar.setHolidayred(); //设置星期六星期天的样式   
    calendar.setA(); //设置td中a的事件
    //左上角休息和上班的标记
    calendar.daySign();

    //获取当前被选中的a，如果没有被选中的则查找今天
    var sarr = [];
    if (calendar.isHasClass('calendar-table-selected')) {
      selectedDate = calendar.withClass('calendar-table-selected').getAttribute('date');
      sarr = selectedDate.split('-');
    } else if (calendar.isHasClass('calendar-table-today')) {
      selectedDate = calendar.withClass('calendar-table-today').getAttribute('date');
      sarr = selectedDate.split('-');
    } else {
      sarr = selectedDate.split('-');
      var syear = calendar.withID('selectedYear').getAttribute('data-value');
      var smonth = calendar.withID('selectedMonth').getAttribute('data-value');
      sarr[0] = syear;
      sarr[1] = smonth;
    }
    if (sarr[2] > calendar.getCurrMonthLashDay(sarr[0], sarr[1])) {
      sarr[2] = calendar.getCurrMonthLashDay(sarr[0], sarr[1])
    }
    selectedDate = sarr[0] + '-' + sarr[1] + '-' + sarr[2];
  },
  // 根据年重新绘制月份表
  createMonthBox: function(year) {
    calendar.createMonthSelect(year);
    calendar.withID("currentYearDrop").setAttribute("data-value", year);
    calendar.withID("currentYearDrop").innerHTML = year + "年";
    calendar.withID("selectedYear").setAttribute("data-value", year);
    calendar.withID("selectedYear").innerHTML = year + "年";
  },
  //切换上一个月，下一个月和返回今天
  leftrightclick: function() {
    var LeftBtn = calendar.withClass('calender-month-prev');
    var rightBtn = calendar.withClass('calender-month-next');
    var toToday = calendar.withClass('totoday');
    var resetBtn = calendar.withClass('calendar-reset');
    //上一个月
    LeftBtn.onclick = function() {
      var monthSelect = calendar.withID("selectedMonth");
      var monthVal = parseInt(monthSelect.getAttribute('data-value'), 10);
      var yearSelect = calendar.withID("selectedYear");
      var yearVal = parseInt(yearSelect.getAttribute('data-value'));
      calendar.withID('monthDropMenu').style.display = 'none';
      if (monthVal == 1) {
        yearVal -= 1;
        monthVal = 12;
      } else {
        monthVal -= 1;
      }
      calendar.createMonthBox(yearVal);
      monthSelect.setAttribute('data-value', monthVal);
      if (monthVal < 10) {
        monthSelect.innerHTML = yearVal + '年0' + monthVal + '月';
      } else {
        monthSelect.innerHTML = yearVal + '年' + monthVal + '月';
      }
      //重新画表
      calendar.createTabledate(yearVal, monthVal);
      //切换时是否会遇到假期安排的时间selectedDate
      if (calendar.isSelectedDate(selectedDate)) {
        calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      } else {
        calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      }
    }
    //下一个月
    rightBtn.onclick = function() {
      var monthSelect = calendar.withID("selectedMonth");
      var monthVal = parseInt(monthSelect.getAttribute('data-value'), 10);
      var yearSelect = calendar.withID("selectedYear");
      var yearVal = parseInt(yearSelect.getAttribute('data-value'));
      calendar.withID('monthDropMenu').style.display = 'none';
      if (monthVal == 12) {
        yearVal += 1;
        monthVal = 1;
      } else {
        monthVal += 1;
      }
      calendar.createMonthBox(yearVal);
      monthSelect.setAttribute('data-value', monthVal);
      if (monthVal < 10) {
        monthSelect.innerHTML = yearVal + '年0' + monthVal + '月';
      } else {
        monthSelect.innerHTML = yearVal + '年' + monthVal + '月';
      }
      //重新画表
      calendar.createTabledate(yearVal, monthVal);
      //切换时是否会遇到假期安排的时间selectedDate
      if (calendar.isSelectedDate(selectedDate)) {
        calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      } else {
        calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      }
    }
    //返回今天
    toToday.onclick = function() {
      var monthSelect = calendar.withID("selectedMonth");
      var yearSelect = calendar.withID("selectedYear");
      yearSelect.innerHTML = calendar.currYear() + '年';
      monthSelect.setAttribute('data-value', calendar.currMonth());
      if (parseInt(calendar.currMonth(), 10) < 10) {
        monthSelect.innerHTML = calendar.currYear() + '年0' + calendar.currMonth() + '月';
      } else {
        monthSelect.innerHTML = calendar.currYear() + '年' + calendar.currMonth() + '月';
      }
      calendar.createMonthBox(calendar.currYear());
      //重新画表
      calendar.createTabledate(calendar.currYear(), calendar.currMonth());
      //切换时是否会遇到假期安排的时间selectedDate
      if (calendar.isSelectedDate(selectedDate)) {
        calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      } else {
        calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      }
    }
    //重置
    resetBtn.onclick = function() {
      signData.signDays = signObjAll.signDays.concat();
      calendar.initCalendar(signObjAll);
    }
  },
  //根据传入的年月日获取具体的时间信息
  setdateinfo: function(year, month, day) {
    var date1 = new Date();
    date1.setFullYear(parseInt(year));
    date1.setMonth(parseInt(month, 10) - parseInt(1), parseInt(day, 10));
    return date1;
  },
  //得到指定月的上个月最后一天传进来按 12月算
  getPervMonthLastDay: function(year, month) {
    //当月就是  month-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
    return parseInt(new Date(year, month - 1, 0).getDate(), 10);
  },
  //创建日历表中的a标签并设置公用属性
  getA: function(year, month, day) {
    //获取农历信息
    var almanacTxt;
    var a = calendar.newElement("a");
    // 今天
    if (year == calendar.currYear() && month == calendar.currMonth() && day == calendar.currDate()) {
      almanacTxt = '今天';
      calendar.addItemClassname(a, 'calendar-table-today');
    }
    a.href = "javascript:;";
    a.innerHTML = '<p class="calendar-table-daynumber"><span class="daynumber">' + day + '</span></p>' +
      '<p class="calendar-table-almanac">' + almanacTxt + '</p>';
    a.setAttribute("date", year + "-" + month + "-" + day);
    //判断是否被选中过
    var itemTxt = year + "-" + month + "-" + day;
    if (calendar.indexOfArray(calendar.selectDays, itemTxt) > -1) {
      calendar.addItemClassname(a, 'calendar-table-selected');
    } else {
      calendar.removeItemClassname(a, 'calendar-table-selected');
    }
    return a;
  },

  //得到指定月最后一天，传进来按 12月算
  getCurrMonthLashDay: function(year, month) {
    if (month >= 12) {
      year = year + 1;
      month = month - 12;
    }
    return parseInt(new Date(year, month, 0).getDate(), 10);
  },

  //给tbody中的td中的A设置事件，上个月的天数,这个月的天数,下个月的天数三种对应的事件
  //这里还有个功能就是判断当前的A中日期是不是数据库中有带状态的日期,如果是就给相当的样式
  setA: function() {
    var tbody = calendar.withClass("calendar-tbody");
    var arr = tbody.getElementsByTagName("a");
    for (var i = 0; i < arr.length; i++) {
      var date = arr[i].getAttribute("date");
      var datearr = date.split("-");
      if (arr[i].className.indexOf("calendar-table-other-month") > -1) {
        arr[i].setAttribute("onclick", "calendar.setOther(" + datearr[0] + "," + datearr[1] + "," + datearr[2] +
          ",this);calendar.stopBubble(this);")
      } else {
        arr[i].setAttribute("onclick", "calendar.setAClick(this);calendar.stopBubble(this);");
      }
      //判断当前值是否被选中
      if (calendar.indexOfArray(calendar.selectDays, date) > -1) {
        //被选中
        calendar.addItemClassname(arr[i], 'calendar-table-selected');
      } else {
        calendar.removeItemClassname(arr[i], 'calendar-table-selected');
      }
    }
  },

  //给当前的A设置点击添加样式
  setAClick: function(obj) {
    var itemA = obj.getAttribute("date");
    var str = obj.className;
    if (!str) {
      str = ''
    }
    calendar.withID('monthDropMenu').style.display = 'none';
    calendar.checkDateType(itemA);
  },
  //给上一个月最后几天和下一个月头几天设置点击跳转月份
  setOther: function(year, month, day, data) {
    calendar.createTabledate(year, month); //创建对应的table(日期)
    calendar.updateSelect(year, month); //改变年月select值
    //选中该天
    var dateTxt = data.getAttribute('date')
    calendar.setAClick(calendar.dateToA(dateTxt))
  },
  //判断是否有某个classname
  isHasClass: function(classname) {
    //获取body下所有的子元素
    var allTag = document.getElementsByTagName('*');
    for (var i = 0; i < allTag.length; i++) {
      if (allTag[i].className.indexOf(classname) > -1) {
        return true;
      } else {
        return false;
      }
    };
  },
  //隐藏所有的下拉框
  hideDropdown: function(classname) {
    //获取body下所有的子元素
    var allTag = document.getElementsByTagName('*');
    for (var i = 0; i < allTag.length; i++) {
      if (allTag[i].className == classname) {
        allTag[i].style.display = 'none';
      }
    };
  },
  //通过a标签上的date值找到对应的a元素
  dateToA: function(val) {
    //获取body下的所有a标签
    var allTagA = document.getElementsByTagName('a');
    for (var i = 0; i < allTagA.length; i++) {
      var attrs = allTagA[i].getAttribute('date');
      if (attrs == val) {
        return allTagA[i];
      }
    };
  },
  
  /**
   * @param ele: 元素标签名
   * @return 新建元素
   */
  newElement: function(ele) {
    return document.createElement(ele);
  },
  /**
   * @param id: 元素id
   * @return 得到id对象
   */
  withID: function(id) {
    return document.getElementById(id);
  },
  /**
   * @param classname: 元素类名
   * @return 得到传入参数为class的对象(同名返回第一个)
   */
  withClass: function(classname) {
    var targets = document.getElementsByTagName("*") || targets;
    for (var k in targets) {
      var target = targets[k];
      if (target.className != "" && target.className != null && target.className != 'undefined') {
        if (target.className.indexOf(classname) > -1) {
          return target;
        }
      }
    }
    return "";
  },
  //判断c是否是小数
  check: function(c) {
    var r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
    return r.test(c);
  },
  //移除某个classname
  removeClassName: function(classname) {
    //获取body下所有的子元素
    var allTag = document.getElementsByTagName('*');
    for (var i = 0; i < allTag.length; i++) {
      calendar.removeArrayItem(allTag[i].classList, classname)
    };
  },
  

  //是否是假期安排的时间---（未用到）
  isSelectedDate: function(str) {
    if (calendar.indexOfArray(calendar.hVal, str) > -1) {
      return true;
    } else {
      return false;
    }
  },

  //已签到日期---标记
  daySign: function() {
    var signdays;
    var signDays = []; // 存放已签到日期
    if (window.XMLHttpRequest) {
      signdays = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      signdays = new window.ActiveXObject();
    } else {
      alert("请升级您的浏览器");
    }
    if (signdays != null) {
      signDays = calendar.signObj.signDays;
      //工作日
      var allTagA = document.getElementsByTagName('a');
      for (var i = 0; i < allTagA.length; i++) {
        var attrs = allTagA[i].getAttribute('date');
        if (calendar.indexOfArray(signDays, attrs) > -1) {
          calendar.addItemClassname(allTagA[i], 'calendar-table-selected');
        }
      };
    }
  },
  /**
   * 判断数组中是否包含某个元素
   * @param {Array} arr
   * @param {String} str
   * @return {Number} 包含返回1，不包含返回-1
   */
  indexOfArray: function(arr, str) {
    for (var i in arr) {
      if (arr[i] == str) {
        return 1;
      }
    }
    return -1;
  },
  //从数组中移除某元素
  removeArrayItem: function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        i--;
      }
    }
  },
  /**
   * @param obj dom元素
   * 从obj对象的classname中移除某个classname
   */
  removeItemClassname: function(obj, classname) {
    var cnStr = obj.className;
    var cnArr = cnStr.split(' ');
    calendar.trimSpace(cnArr)
    for (var i = 0; i < cnArr.length; i++) {
      if (cnArr[i] == classname) {
        cnArr.splice(i, 1);
        i--;
      }
    }
    obj.className = cnArr.join(' ');
  },
  /**
   * @param {Object} 目标dom对象
   * @param {String} 要添加的classname
   */
  addItemClassname: function(obj, classname) {
    obj.className = calendar.trimString(obj.className + ' ' + classname);
  },
  /**
   * @param {String} str 去掉字符串前后的空格
   * trim()函数不兼容IE8，以下为兼容IE8版
   */
  trimString: function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  /**
   * 去掉array中的空，null和undefined
   * @param {Array}
   * @return {Array}
   */
  trimSpace: function(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == " " || array[i] == null || typeof(array[i]) == "undefined") {
        array.splice(i, 1);
        i = i - 1;
      }
    }
    return array;
  },
  //设置星期六星期天的样式
  // setHolidayred: function() {
  //   var rows = calendar.withClass('calendar-tbody').rows;
  //   //行遍历
  //   for (var i = 0; i < rows.length; i++) {
  //     //列遍历
  //     for (var j = 0; j < rows[i].cells.length; j++) {
  //       var cell = rows[i].cells[j];
  //       var cellDiv = cell.childNodes[0];
  //       var cellA = cellDiv.childNodes[0];
  //       var aDate = cellA.getAttribute('date');
  //       var arr = aDate.split('-');
  //       //判断是否是今天
  //       if ((arr[0] == calendar.currYear()) && (arr[1] == calendar.currMonth()) && (arr[2] == calendar.currDate())) {
  //         calendar.addItemClassname(cellA, 'calendar-table-today');
  //       }
  //     }
  //   }
  // },
  //更新日历下拉选项中的年和月
  updateSelect: function(year, month) {
    var selectmonth = calendar.withID("selectedMonth");
    var selectyear = calendar.withID("selectedYear");
    selectyear.innerHTML = year + '年';
    selectyear.setAttribute('data-value',year);
    selectmonth.setAttribute('data-value',month);
    if(parseInt(month, 10) < 10) {
      selectmonth.innerHTML = year + '年0' + month + '月';
    } else {
      selectmonth.innerHTML = year + '年' + month + '月';
    }
  },

  //判断选择的日期是工作日还是非工作日
  checkDateType: function(val) {
    if (calendar.dateToA(val).className.indexOf("calendar-table-weekend") > -1 && calendar.dateToA(val).className.indexOf(
        "calendar-table-selected") > -1) {
      //周末
      if (calendar.dateToA(val).className.indexOf("calendar-table-work") > -1) {
        //正常周末调休上班----选中则表示要变成休息日
        calendar.handleRestDays.push(val);
      } else {
        //正常周末放假----选中则表示要变成工作日
        calendar.handleWorkDays.push(val);
      }
    } else if (calendar.dateToA(val).className.indexOf("calendar-table-selected") > -1) {
      //工作日
      if (calendar.dateToA(val).className.indexOf("calendar-table-rest") > -1) {
        //正常放假----选中则表示要变成工作日
        calendar.handleWorkDays.push(val);
      } else {
        //正常上班----选中则表示要变成休息日
        calendar.handleRestDays.push(val);
      }
    } else {
      calendar.removeArrayItem(calendar.handleWorkDays, val)
      calendar.removeArrayItem(calendar.handleRestDays, val)
    }
  },

  // 返回操作了的日期
  returnHandleWorkData: function() {
    return calendar.removeSameItem(calendar.handleWorkDays);
  },
  returnHandleRestData: function() {
    return calendar.removeSameItem(calendar.handleRestDays);
  },
  returnHandleSignData: function() {
    return calendar.removeSameItem(calendar.handleSignDays);
  },
  
  //日期格式转换：例：2020-2-1转换成2020年2月1日
  dateFormat: function(val) {
    var arr = val.split("-");
    return arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
  },
  //日期格式转换：例：20200201转换成2020-2-1
  dateFormat2: function(val) {
    var arr0 = val.substring(0, 4);
    var arr1 = val.substring(4, 6);
    var arr2 = val.substring(6, 8);
    return arr0 + '-' + parseInt(arr1, 10) + '-' + parseInt(arr2, 10);
  },
  /**
   * 日期数组排序
   * @param {Object} arr1
   * @param {Object} arr2
   */
  sortDateArray: function(arr) {
    for (var i in arr) {
      var arrStr = arr[i].split('-');
      if (parseInt(arrStr[1], 10) < 10) {
        arrStr[1] = '0' + arrStr[1];
      }
      if (parseInt(arrStr[2], 10) < 10) {
        arrStr[2] = '0' + arrStr[2];
      }
      arr[i] = arrStr[0] + arrStr[1] + arrStr[2]
    }
    arr.sort();
    for (var j in arr) {
      arr[j] = calendar.dateFormat2(arr[j])
    }
    return arr;
  },
  //过滤数组,去除第一个数组中和第二个数组相同的部分
  filterArray: function(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          arr1.splice(i, 1);
          i--;
        }
      }
    }
    return arr1;
  },
  // 排除数组中相同的元素
  removeSameItem: function(arr) {
    var tempA = [];
    for (var i = 0; i < arr.length; i++) {
      //判断当前数组下标为i的元素是否已经保存到临时数组 
      //如果已保存，则跳过，否则将此元素保存到临时数组中 
      if (calendar.indexOfArray(tempA, arr[i]) == -1) {
        tempA.push(arr[i]);
      }
    }
    return tempA;
  },
  
  //阻止冒泡
  stopBubble: function(event) {
    if (event && event.stopPropagation) { // 别的浏览器
      event.stopPropagation();
    } else { //IE
      var e = event || window.event;
      e.cancelBubble = true;
    }
  },
  
  /**
   * 数据存储
   */
  storeData: function(data) {
    var sd = calendar.returnHandleSignData(); // 已签到的日期
    data.signDays.push.apply(data.signDays, sd) // 合并
    calendar.updateData(data);
    var setYearValS = parseInt(calendar.withID("selectedYear").getAttribute("data-value"))
    var setMonthValS = parseInt(calendar.withID("selectedMonth").getAttribute("data-value"), 10)
    if (parseInt(setMonthValS, 10) < 10) {
      calendar.withID("selectedMonth").innerHTML = setYearValS + '年0' + setMonthValS + '月'
    } else {
      calendar.withID("selectedMonth").innerHTML = setYearValS + '年' + setMonthValS + '月'
    }
    calendar.createMonthBox(setYearValS)
    calendar.selectDays = [];
    //重新加载日历
    // calendar.createTabledate(setYearValS, setMonthValS);
  },
  // 更新数据
  updateData: function(data) {
    if (data) {
      calendar.signObj = data;
    }
  },
  /**
   * 初始化日历
   */
  handleSignDays: [],
  selectDays: [],
  handleWorkDays: [], // 工作日
  handleRestDays: [], // 休息日
  // 标记当前一年的所有法定节假日及调休日
  signObj: signObjAll,
  hVal: [],
  initCalendar: function(data) {
    calendar.handleWorkDays = []; //工作日
    calendar.handleRestDays = []; //休息日
    calendar.selectDays = [];
    calendar.handleSignDays = [];

    calendar.updateData(data)
    // 创建日历外框
    calendar.calendarContainer()
    //创建年份下拉,并给对应事件
    calendar.createSelectYear();
    //创建月份下拉，并给对应事件
    calendar.createMonthSelect(calendar.currYear());
    //获取当前选中的是哪一年哪一月
    var setYearVal = parseInt(calendar.withID("selectedYear").getAttribute("data-value"))
    var setMonthVal = parseInt(calendar.withID("selectedMonth").getAttribute("data-value"), 10)
    //根据年，月，用table绘制日历。 年月变动则 重新绘制
    calendar.createTabledate(setYearVal, setMonthVal);
    //上月下月的a标签给事件
    calendar.leftrightclick();
  }
}
// 存放当前被选中的或者今天的日期
var selectedDate = calendar.currYear() + '-' + calendar.currMonth() + '-' + calendar.currDate();
// 日期初始化
calendar.initCalendar(calendar.signObj);

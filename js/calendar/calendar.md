@[TOC](日历插件)

# 日历插件

本文主要介绍在写日历插件的时候遇到的问题及解决方法。因为需要兼容到IE8，所以基本就直接改方法，没有写两套（根据浏览器版本来切换不同的js）。

## 一、日历样式
**有两套：**
1. 星期日开始到星期六，点击[网页](https://onepiece1991.github.io/Plugin/views/calendarModel01.html)查看
2. 星期一开始到星期日，点击[网页](https://onepiece1991.github.io/Plugin/views/calendarModel02.html)查看

两种样式只需要修改不同的遍历方式就可以了，具体可查看源代码

## 二、日历功能
1. 显示当天日期
2. 选中日期（标红圈），点击保存修改可将工作日改成休息日，休息日改为工作日
3. 返回当天
4. 重置日历

## 三、日历代码解析
（农历的是网上找的，直接拿来用了）
1. 变量`signObjAll`用来储存当前一年(目前2020年)的法定节假日及调休日
2. 如果没有传入的日期数据，则根据`signObjAll`的日期来加载日历，如果有单独的`data`则需要重新调用`calendar.initCalendar(data)`,所以最开始需要判断页面中是否已经有加载过日历，有的话需要先移除;
3. 日历中包含创建整个日历的外框`calendar.calendarContainer()`,创建年下拉`calendar.createSelectYear()`,创建月份下拉`calendar.createMonthSelect()`,创建上下月返回今天及重置按钮`calendar.leftrightclick()`;

## 四、兼容IE8
在测试代码兼容性的时候出现了很多不兼容IE8的方法，下面来逐一介绍

### 4.1、classList[参考地址](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
`classList`属性从IE10开始支持（Partial support）,因此给dom添加和删除class就不能直接用[add](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/add)和[remove](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/remove)(add和remove方法也不兼容IE8),这里通过改变`className`的值来兼容

添加(add):
```javascript
addItemClassname: function(dom, classname) {
  dom.className = calendar.trimString(dom.className + ' ' + classname);
}
```
(trimString下面会讲)

移除(remove):
```javascript
removeItemClassname: function(dom, classname) {
    var cnStr = dom.className;
    var cnArr = cnStr.split(' ');
    calendar.trimSpace(cnArr)
    for (var i = 0; i < cnArr.length; i++) {
      if (cnArr[i] == classname) {
        cnArr.splice(i, 1);
        i--;
      }
    }
    dom.className = cnArr.join(' ');
  }
```
`trimSpace()`方法是用来去除数组中的空元素，null和undefined
```javascript
trimSpace: function(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == " " || array[i] == null || typeof(array[i]) == "undefined") {
      array.splice(i, 1);
      i = i - 1;
    }
  }
  return array;
}
```

### 4.2、trim[参考地址](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
`trim()` 方法会从一个字符串的两端删除空白字符,兼容到IE9
```javascript
trimString: function(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
```

### 4.3、indexOf
`indexOf`分为[String.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
和[Array.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
这里要将的是`Array.prototype.indexOf()`,因为它只兼容到IE9

替换方法：
```javascript
  /**
   * 数组中是否包含某个元素
   * 包含返回1，不包含返回-1
   */
indexOfArray: function(arr, str) {
  for (var i in arr) {
    if (arr[i] == str) {
      return 1;
    }
  }
  return -1;
}
```

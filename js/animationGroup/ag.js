/**
 * @Author: Jinxx
 * @Time: 2022/05/09
 * @Description: animation javascript
 */
var LuckGame = (function (win, doc) {
  function Luck(setting) {
    this.setting = {
      // 奖品个数
      len: 50,
      // 滚动时间
      speed: 5000,
      // 循环几圈
      circle: 10,
      prizeArr: [100, 200, 300, 400, 500]
    };
    for (var i in setting) {
      this.setting[i] = setting[i];
    }
    this.$ul = doc.querySelectorAll('.game-box ul');
    this.$height = doc.querySelector('.game-item').offsetHeight;
    this.setList();
  }
  Luck.prototype = {
    setList: function () {
      //填充li
      let html = '';
      for (let n = 0; n < this.setting.circle; n++) {
        for (let i = 0; i < this.setting.len; i++) {
          //图片这里自己添加img以及修改样式
          html += '<li class="draw-li">'
            + '<p class="draw-num">' + this.setting.prizeArr[i] + '</p>'
            + '<p>积分</p>'
            + '</li>';
        };
      };
      Array.prototype.forEach.call(this.$ul, function (o, i) {
        o.innerHTML = html;
        //设置默认随机显示
        o.style['-webkit-transform'] = 'translate(0px, 0px) translateZ(0px)';
        o.style['transform'] = 'translate(0px, 0px) translateZ(0px)';
      });
    },
    start: function (arr, fn) {
      let that = this, countNum = 0;
      //开始抽奖
      Array.prototype.forEach.call(that.$ul, function (o, i) {
        that.$height = doc.querySelector('.game-item').offsetHeight;
        setTimeout(function () {
          var y = (arr[i] + that.setting.len * (that.setting.circle - 1)) * that.$height;
          o.style['transition'] = that.setting.speed + 'ms ease';
          o.style['transform'] = 'translate(0px, -' + y + 'px) translateZ(0px)'
        }, i * 300);
        o.addEventListener('webkitTransitionEnd', function () {
          this.style['transition'] = '0ms ease';
          this.style['transform'] = 'translate(0px, -' + arr[i] * that.$height + 'px) translateZ(0px)';
          countNum++;
          if (countNum == that.$ul.length) {
            fn && fn();
          }
        }, false);
      })
    }
  }

  if (typeof module != 'undefined' && module.exports) {
    module.exports = Luck;
  } else {
    window.Luck = Luck;
  }
  return Luck
})(window, document)

/*
 *	n: 随机数组中的元素个数
 *	min: 随机数组中的元素的最小值
 *	max: 随机数组中的元素的最大值
 */
function getRandArr(n, min, max) {
  const randArr = [];
  let randNo = Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < n; i++) {
    randArr[i] = randNo;
  }
  return randArr;
}

var game = new LuckGame({
  len: 5, // 奖品个数
  speed: 5000, // 滚动时间
  circle: 6, // 循环几圈
  prizeArr: [1000, 2000, 3000, 4000, 5000] // 奖品数组
});
function drawStart() {
  drawtipsPop()
}
// 点击开始抽奖-弹出提示小号积分
var chanceNo = 2  // 抽奖机会
function drawtipsPop() {
  if (chanceNo > 0) {
    chanceNo--
    if (confirm('本次抽奖将消耗200积分，积分一经消耗不再退回，是否继续抽奖？')) {
      continueDraw()
    }
  } else {
    // 抽奖机会用完
    alert('抱歉，本期活动奖励已全部发放。下期活动敬请期待！')
  }
}

// 继续抽奖
function continueDraw() {
  document.getElementById('drawHandle').classList.add('active')
  let randomArr = getRandArr(3, 0, 4) // 后端传入中奖数组
  game.start(randomArr, function () {
    celebrate(randomArr)
  })
  setTimeout(function () {
    document.getElementById('drawHandle').classList.remove('active')
  }, 5000)
}

// 中奖
function celebrate(arr) {
  let m = parseInt(arr[0])
  $('#drawBtn').text('恭喜中奖')
  $('#drawLH').addClass('lucky')
  let drawTxt = '<p class="dt-txt">恭喜您获得' + game.setting.prizeArr[m] + '积分</p>'
  $('#drawTips').html(drawTxt)
}

// 抽奖机会用完
function noChancePop() {
  alert('抱歉，本期活动奖励已全部发放。下期活动敬请期待！')
}

/**
 * ===============================分割线===============================
 */
// 转盘抽奖
var prizeList = [
  {
    id: 1,
    text: '咖啡机',
    img: '../images/animationGroup/ag03/prize1.png'
  },
  {
    id: 2,
    text: '继续努力',
    img: ''
  },
  {
    id: 3,
    text: '按摩肩带',
    img: '../images/animationGroup/ag03/prize2.png'
  },
  {
    id: 4,
    text: '循环扇',
    img: '../images/animationGroup/ag03/prize1.png'
  }
  ,
  {
    id: 5,
    text: '空气炸锅',
    img: '../images/animationGroup/ag03/prize2.png'
  }
  ,
  {
    id: 6,
    text: '祝你好运',
    img: ''
  }
]
// creatDrawBox()
function creatDrawBox() {
  var drawStr = ''
  for (var i = 0; i < prizeList.length; i++) {
    drawStr += '<div class="item-box item-box0' + i + '">'
      + '<div class="prize-item" >'
    
    if (prizeList[i].img) {
      drawStr += '<img class="draw-img" src="' + prizeList[i].img + '" alt="' + prizeList[i].text + '" />'
      +'<p class="draw-txt">' + prizeList[i].text + '</p>'
    } else {
      drawStr += '<p class="draw-txt draw-txt02">' + prizeList[i].text + '</p>'
    }
    drawStr +=  '</div></div>'
  }
  $('#prizeBox').html(drawStr)
}

var roting = false
var loading = false
var deg = 0
// 获取到奖品后转盘旋转动画时间
var round_time = 5000
// 开始抽奖
function clickDrawBtn() {
  if (roting || loading) return
  loading = true
  // 前端生成随机数奖品
  setTimeout(() => {
    var randomNo = Math.floor(Math.random() * prizeList.length)
    var activePrize = prizeList[randomNo]
    // 使用 some 循环，获取到奖品即停止遍历
    prizeList.some((item, index) => {
      if (item.id === activePrize.id) {
        // 获取该奖品的一个随机角度，具体见下方函数注释
        var newDeg = this.getRote(index, prizeList.length)
        // roting 为 true 时，转盘有旋转动画，时间为 round_time
        roting = true
        deg = newDeg
        $('.round').removeClass('not_roting')
        $('.round').css({ 'transition': round_time + 'ms', 'transform': 'rotate(' + deg + 'deg)' })
        setTimeout(() => {
          // 经过 config.round_time 的时间后，转盘进行复位，方便下一次抽取，deg 不取 0 而是 NewDeg % 360 以确保用户看不到转盘闪动
          roting = false
          deg = newDeg % 360
          $('.round').addClass('not_roting')
          $('.round').css({ 'transition': round_time + 'ms', 'transform': 'rotate(' + deg + 'deg)' })
          rotateWin(activePrize.text)
        }, round_time)
        return true
      }
    })
    loading = false
  }, 100);
}
/**
 * 根据奖品获取转盘角度
 * @param {number} index 获得奖品在 prizeList 中的 index
 * @param {number} count 奖品数量
 * @return {number}
 */
function getRote(index, count) {
  if (!count) {
    count = 8
  };
  const MAX_ROUND = 10;
  const MIN_ROUND = 8;
  const OFFSET_MULTIPLE = 0;
  const unit = 360 / count;
  const offset = Math.floor(Math.random() * -unit) + unit / 2;
  const roundNo = Math.floor(Math.random() * (MAX_ROUND - MIN_ROUND + 1) + MIN_ROUND)
  const newDeg = 360 * roundNo - unit * index;
  return newDeg + OFFSET_MULTIPLE * offset;
}

// 提示中奖弹框
function rotateWin(str) {
  if (str != '继续努力' && str != '祝你好运') {
    str = '恭喜获得 <span class="col-blue2 fwb">' + str + '</span> ！请于1个月内兑换，否则中奖信息将会失效。'
  }
  alert(str)
}

// 切换动画
function changeMenu(obj,n) {
  if( n==3 ) {
    creatDrawBox()
  }
  $(obj).addClass('active').siblings('li').removeClass('active')
  $('#animWidget0' + n).removeClass('ag-hide').siblings('.anim-widget').addClass('ag-hide')
}
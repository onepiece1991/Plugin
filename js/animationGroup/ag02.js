/**
 * @Author: Jinxx
 * @Time: 2022/05/09
 * @Description: draw javascript
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
    if (confirm('本次抽奖将消耗200财务积分，积分一经消耗不再退回，是否继续抽奖？')) {
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
  let drawTxt = '<p class="dt-txt">恭喜您获得' + game.setting.prizeArr[m] + '财务积分</p>'
  $('#drawTips').html(drawTxt)
}

// 抽奖机会用完
function noChancePop() {
  alert('抱歉，本期活动奖励已全部发放。下期活动敬请期待！')
}